import requests
import re
import json
# 导入的包
headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0'
}
#请求头

search_content = input("请输入你要查找的内容: ")
search_keyword = search_content.encode('utf-8')
search_keyword = str(search_keyword)[2:-1].replace('\\x', '%').upper()

response_cookies = requests.get('https://www.bilibili.com/', headers=headers).cookies.get_dict()
video_cids = []
video_bvids = []
#搜索网页下三百个视频的bv号
for page in range(0, 15):
    url = f"https://api.bilibili.com/x/web-interface/wbi/search/type?keyword={search_keyword}&search_type=video&page={page + 1}"
    response = requests.get(url, headers=headers, cookies=response_cookies)

    video_bvids.extend(re.findall(r'"bvid": "(\w+)', response.text))
    response_dict = json.loads(response.text)
    result_list = response_dict.get('data', {}).get('result', [])
    for result in result_list:
        bvid = result.get('bvid')
        if bvid:
            video_bvids.append(bvid)

#通过视频的bv号找到cid号
for index in video_bvids:
    myUrl = 'https://api.bilibili.com/x/player/pagelist?bvid=' + index + '&jsonp=jsonp'

    response = requests.get(url=myUrl, headers=headers)

    d = json.loads(response.text)
    cid = d['data'][0]['cid']
    video_cids.append(cid)

#有了cid号 也知道弹幕网址的固定格式 即可爬取视频弹幕
for j in video_cids:
    url2 = f'https://api.bilibili.com/x/v1/dm/list.so?oid={j}'
    response3 = requests.get(url=url2, headers=headers)
    response3.encoding = response3.apparent_encoding
    data_list = re.findall('<d p=".*?">(.*?)</d>', response3.text, )
    for i in data_list:
        with open('弹幕.txt', mode='a', encoding='utf-8') as f:
            f.write(i)
            f.write('\n')

#最后生成弹幕.txt文档