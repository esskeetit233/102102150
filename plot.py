import pandas as pd
import matplotlib.pyplot as plt

# 读取文件
with open('弹幕.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 提取弹幕内容
danmaku_list = [line.strip() for line in lines]

# 统计数量
danmaku_counts = pd.Series(danmaku_list).value_counts().head(20)

# 绘制直方图
plt.figure(figsize=(10, 5))
plt.bar(danmaku_counts.index, danmaku_counts.values)
plt.xticks(rotation=90)
plt.title('数量排名20的弹幕')
plt.xlabel('弹幕')
plt.ylabel('数量')
plt.show()