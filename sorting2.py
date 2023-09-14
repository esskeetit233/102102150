from collections import Counter

# 读取'弹幕.txt'文件，每一行作为一个弹幕
with open("弹幕.txt", "r", encoding="utf-8") as f:
    danmaku_list = f.readlines()

# 对每个弹幕取前四个字，然后归类统计，得到每个类别出现的次数
danmaku_category_counter = Counter(['1' if danmaku[0] == '1' else danmaku[:4] for danmaku in danmaku_list])

# 对类别按出现次数从高到低进行排序，并取前20个
sorted_danmaku_category = sorted(danmaku_category_counter.items(), key=lambda x: x[1], reverse=True)[:20]

# 将结果写入'统计.txt'文件，包括每个类别中的所有相关弹幕，但相同弹幕只输出第一个
with open("统计.txt", "w", encoding="utf-8") as f:
    for category, count in sorted_danmaku_category:
        f.write(f"{category.strip()}: {count}\n")
        unique_danmaku_lines = sorted(set([danmaku for danmaku in danmaku_list if
                                           (danmaku[0] == '1' and category == '1') or (danmaku[:4] == category)]))
        for i, danmaku_line in enumerate(unique_danmaku_lines):
            if i == 0:
                f.write(f"{danmaku_line.strip()}\n")