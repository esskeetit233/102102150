from openpyxl import Workbook

with open('弹幕.txt','r',encoding='utf-8') as f:
    datalist = f.read()

workbook = Workbook()
worksheet = workbook.active

rows  = datalist.split('\n')

for row in rows:
    worksheet.append(row.split('\t'))

workbook.save('output.xlsx')