import json
import requests
from bs4 import BeautifulSoup
import time
import re
from textblob import TextBlob
from fake_useragent import UserAgent
from newspaper import Article

class URL:
    def __init__(self, language='en'):
        if language == 'en':
            self.google_news_url = 'https://www.google.com/search?q={}&tbm=nws&start={}'
        else:
            raise Exception('Unknown language.')

    def create(self, q, start):
        return self.google_news_url.format(q,start)

def extract_links(content):
    soup = BeautifulSoup(content.decode('utf8'), 'lxml')
    blocks = [a for a in soup.find_all('div', {'class': ['dbsr']})]
    links_list = [(b.find('a').attrs['href'], b.find('div', {'role': 'heading'}).text) for b in blocks]
    dates_list = [b.find('span', {'class': 'WG9SHc'}).text for b in blocks]
    assert len(links_list) == len(dates_list)
    output = [{'link': l[0], 'title': l[1], 'date': d} for (l, d) in zip(links_list, dates_list)]
    return output

def google_news_run(keyword, offset=0, language='en', limit=10, sleep_time_every_ten_articles=10):
    ua = UserAgent()
    uf = URL(language)
    result = []
    start = 0
    while start < 10:
        url = uf.create(keyword, start + offset*10)
        start += 10
        headers = {'User-Agent': ua.chrome}
        try:
            response = requests.get(url, headers=headers, timeout=20)
            links = extract_links(response.content)
            result.extend(links)
            if len(links) < 10:
              break
        except requests.exceptions.Timeout:
            pass
        time.sleep(sleep_time_every_ten_articles)
    return result

def get_news(q, offset):
    res = google_news_run(keyword=[q], offset=offset)
    results = []
    for link in res:
        try:
            a = Article(link["link"])
            a.download()
            a.parse()
            tb = TextBlob(a.text)
            url_regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
            urls = re.findall(url_regex, a.text)
            link["urls"] = [x[0] for x in urls]
            link["title"] = a.title
            link["content"] = a.text
            link["authors"] = a.authors
            link["polarity"] = tb.sentiment.polarity
            link["sentiment"] = 'positive' if link["polarity"] > 0 else 'negative' if link["polarity"] < 0 else 'neutral' 
            link["subjectivity"] = tb.sentiment.subjectivity
            link["image"] = a.top_image
            results.append(link)
        except:
            continue
    return results