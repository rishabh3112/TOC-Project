import re
import PyPDF2 as pdf
from PIL import Image
from pytesseract import image_to_string

output = ''
pdf_file = open('example.pdf', 'rb')  
pdf_reader = pdf.PdfFileReader(pdf_file)  

i = 0
while i < pdf_reader.numPages:
  output += pdf_reader.getPage(i).extractText()
  i += 1
pdf_file.close()  

output = image_to_string(Image.open('example.png'))
print(output)

emails = re.findall(r"[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+", output)
numbers = re.findall(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]', output)
url_regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
urls = re.findall(url_regex, output)
urls = [x[0] for x in urls]

print(emails)
print(numbers)
print(urls)