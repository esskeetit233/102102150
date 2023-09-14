import jieba
import wordcloud
with open('统计3.txt', 'r',encoding='utf-8') as file:
    for i, line in enumerate(file):
        if i % 2 == 1:
            with open('统计4.txt', mode='a', encoding='utf-8') as f:
                f.write(line)


f2 = open('统计4.txt',encoding='utf-8')
text = f2.read()
textlist = jieba.lcut(text)
textstr = ' '.join(textlist)
wc = wordcloud.WordCloud(
    width=500,
    height=500,
    background_color='white',
    font_path='msyh.ttc'
)

wc.generate(textstr)
wc.to_file('词云2.png')