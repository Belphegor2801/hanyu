# Define the phonetic data as a multi-line string
phonetic_data = """
a,ba,pa,ma,fa,da,ta,na,la,ga,ka,ha,0,0,0,za,ca,sa,zha,cha,sha,0
ai,bai,pai,mai,0,dai,tai,nai,lai,0,0,0,0,0,0,zai,cai,sai,zhai,chai,shai,0
an,ban,pan,man,fan,dan,tan,nan,lan,gan,kan,han,0,0,0,zan,can,san,zhan,chan,shan,ran
ang,bang,pang,mang,fang,dang,tang,nang,lang,gang,kang,hang,0,0,0,zang,cang,sang,zhang,chang,shang,rang
ao,bao,pao,mao,0,dao,tao,nao,lao,gao,kao,hao,0,0,0,zao,cao,sao,zhao,chao,shao,rao
e,0,0,me,0,de,te,ne,le,ge,ke,he,0,0,0,ze,ce,se,zhe,che,she,re
0,bei,pei,mei,fei,dei,0,nei,lei,0,0,0,0,0,0,0,0,0,0,0,0,0
en,ben,pen,men,fen,den,0,nen,0,gen,ken,hen,0,0,0,zen,cen,sen,zhen,chen,shen,ren
eng,beng,peng,meng,feng,deng,teng,neng,leng,geng,keng,heng,0,0,0,zeng,ceng,seng,zheng,cheng,sheng,reng
er,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
í,bi,pi,mi,0,di,ti,ni,li,0,0,0,ji,qi,xi,zi,ci,si,zhi,chi,shi,ri
ya,0,0,0,0,dia,0,0,lia,0,0,0,jia,qia,xia,0,0,0,0,0,0,0
yan,bian,pian,mian,0,dian,tian,nian,lian,0,0,0,jian,qian,xian,0,0,0,0,0,0,0
yang,0,0,0,0,0,0,niang,liang,0,0,0,jiang,qiang,xiang,0,0,0,0,0,0,0
yao,biao,piao,miao,0,diao,tiao,niao,liao,0,0,0,jiao,qiao,xiao,0,0,0,0,0,0,0
ye,bie,pie,mie,0,die,tie,nie,lie,0,0,0,jie,qie,xie,0,0,0,0,0,0,0
yin,bin,pin,min,0,0,0,nin,lin,0,0,0,jin,qin,xin,0,0,0,0,0,0,0
ying,bing,ping,ming,0,ding,ting,ning,ling,0,0,0,jing,qing,xing,0,0,0,0,0,0,0
yong,0,0,0,0,0,0,0,0,0,0,0,jiong,qiong,xiong,0,0,0,0,0,0,0
0,0,0,miu,0,diu,0,niu,liu,0,0,0,jiu,qiu,xiu,0,0,0,0,0,0,0
o,bo,po,mo,fo,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
0,0,0,0,0,dong,tong,nong,long,gong,kong,hong,0,0,0,zong,cong,song,zhong,chong,0,rong
ou,0,pou,mou,fou,dou,tou,0,lou,gou,kou,hou,0,0,0,zou,cou,sou,zhou,chou,shou,rou
w,bu,pu,mu,fu,du,tu,nu,lu,gu,ku,hu,0,0,0,zu,cu,su,zhu,chu,shu,ru
wa,0,0,0,0,0,0,0,0,gua,kua,hua,0,0,0,0,0,0,zhua,chua,shua,0
wai,0,0,0,0,0,0,0,0,guai,kuai,huai,0,0,0,0,0,0,zhuai,chuai,shuai,0
wan,0,0,0,0,duan,tuan,nuan,luan,guan,kuan,huan,0,0,0,zuan,cuan,suan,zhuan,chuan,shuan,ruan
wang,0,0,0,0,0,0,0,0,guang,kuang,huang,0,0,0,0,0,0,zhuang,chuang,shuang,0
0,0,0,0,0,dui,tui,0,0,0,0,0,0,0,0,zui,cui,sui,zhui,chui,shui,rui
0,0,0,0,0,dun,tun,0,lun,gun,kun,hun,0,0,0,zun,cun,sun,zhun,chun,shun,run
weng,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
wuo,0,0,0,0,duo,tuo,nuo,luo,guo,kuo,huo,0,0,0,zuo,cuo,suo,zhuo,chuo,shuo,ruo
yü,0,0,0,0,0,0,nü,lü,0,0,0,jü,qü,xü,0,0,0,0,0,0,0
yüan,0,0,0,0,0,0,0,0,0,0,0,jüan,qüan,xüan,0,0,0,0,0,0,0
yüe,0,0,0,0,0,0,nüe,lüe,0,0,0,jüe,qüe,xüe,0,0,0,0,0,0,0
yün,0,0,0,0,0,0,0,0,0,0,0,jün,qün,xün,0,0,0,0,0,0,0

"""

# Parse the data into a list of lists
phonetic_table = [line.split(",") for line in phonetic_data.strip().split("\n")]

import os
os.chdir(os.path.dirname(os.path.realpath(__file__)))

import json

def load_json(file):

    # Load JSON data from a file
    with open(file, 'r') as file:
        data = json.load(file)

    # Print the loaded data
    return data

def save_json(file, data):
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)  # Use indent for pretty printing

# _o = []
# for r, row in enumerate(phonetic_table[0]):
#     _d = {}
#     _d["text"] = row[0]
#     _d["mapping"] = str(r).rjust(2, "0")
#     _o.append(_d)
    
# save_json("initial_chars.json", _o)

# _final = load_json("final_chars.json")
# _init = load_json("initial_chars.json")
# _tones = load_json("tones.json")

_output = []
for r, row in enumerate(phonetic_table):
    _r = []
    for c, cell in enumerate(row):
        if cell != "0":
            _r.append(cell)
        else:
            _r.append(" ")
    _output.append(_r)

filename = 'data0.json'

# Write the dictionary to the JSON file
with open(filename, 'w') as file:
    json.dump(_output, file, indent=4)  # Use indent for pretty printing