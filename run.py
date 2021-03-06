import requests
import base64
from github import Github
import urllib.request
import json
from pprint import pprint
from datetime import date
from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pyplot as plt
import pickle
import random
from pandas import DataFrame
import pandas as pd
from flask import Flask , jsonify ,request
from flask_cors import CORS, cross_origin

app =Flask(__name__)
CORS(app)

"""

username = "username"
password = "password"

g = Github(username,password)

user = g.get_user()

sum_forks,sum_stars,sum_repos=0,0,0
for repo in user.get_repos():
    if repo.language!=None:  #removing forked repos
        sum_stars = sum_stars+repo.stargazers_count
        sum_forks = sum_forks+repo.forks
        sum_repos = sum_repos+1

"""
def total_commits(user):
    
    total_commits = 0
    for repo in g.get_user().get_repos():
        if repo.language is not None:   #removed forked repos
            total_commits = repo.get_commits().totalCount+total_commits
    return total_commits

"""df = pd.read_csv("dataset1.csv")
df2 = pd.read_csv("dataset2.csv")

X = df[['t_stars','t_forks','t_repos','t_commits']].values"""
scoring_weights = np.array([1, 1.02, 1.9,1.9])
clustering_weights = scoring_weights**0.5

#X = X * clustering_weights
number_clusters = 200


"""kmeans = KMeans(n_clusters = number_clusters, init = 'k-means++') # With 200 clusters to level from 1 to 200
y_kmeans = kmeans.fit(X)
"""

def givescores(x):
    return np.dot(x, np.array([1,1,1,1]).T)

"""# Now to sort the clusters on a criteria
scores = givescores(kmeans.cluster_centers_)
sorted_clusters = [x for (y, x) in sorted(zip(scores, kmeans.cluster_centers_))]"""

sorted_clusters=[([10.19354839,  9.8062935 , 17.07443458,  9.78222815]), ([ 9.23076923, 13.24588917, 35.09630875,  7.89932025]), ([ 9.15789474,  9.80715085, 18.78983488, 29.70825244]), ([11.96969697,  8.8141134 , 51.83637728,  8.85520708]), ([ 7.5483871 , 12.18456402, 37.83943706, 28.94650238]), ([12.85365854, 10.074872  , 18.89423268, 47.84073506]), ([10.35897436, 10.25488194, 17.53048252, 72.91408353]), ([13.77777778, 14.13930691, 52.27728119, 32.21383245]), ([12.32258065, 11.92393164, 40.19606475, 60.51642049]), ([13.4       ,  8.85389933, 54.8145672 , 51.82802331]), ([ 10.85714286,  11.19602262,  13.86281474, 102.7108547 ]), ([10.55172414, 11.56219186, 34.36505948, 87.02963195]), ([12.32352941,  8.76280576, 54.20374465, 76.01497474]), ([ 8.94444444, 10.04339658, 48.78021697, 99.01541687]), ([  7.47222222,   9.67869223,  30.78437555, 119.23202171]), ([  9.73076923,  11.22598818,  14.63229791, 135.18970891]), ([  9.83870968,  13.81351643,  17.34122262, 152.02471833]), ([ 10.52777778,   8.78095846,  37.25522065, 137.45759728]), ([  9.33333333,  10.47823637,  55.07876147, 120.78272719]), ([ 10.27777778,   6.90132837,  14.0137829 , 166.7869899 ]), ([  8.02631579,   8.95666622,  36.89046732, 156.59404859]), ([  8.11111111,  11.48351117,  54.82988281, 147.84668587]), ([ 10.36111111,  11.47415978,  16.57914753, 190.98565327]), ([ 10.28947368,   9.88688378,  32.71897888, 177.48776459]), ([ 11.7027027 ,  11.05486351,  53.27348572, 167.97912385]), ([  8.94736842,  13.76721989,  34.09738376, 196.0962304 ]), ([ 12.14705882,  10.9609333 ,  17.71655678, 214.70682997]), ([ 10.44117647,  11.10945543,  12.81105708, 242.80196464]), ([ 10.58823529,  11.58472625,  37.33855559, 218.72042064]), ([ 12.75      ,  12.11940593,  54.44699257, 199.13027572]), ([  7.44827586,  11.59701774,  29.18415839, 234.85167201]), ([ 10.82608696,   9.57257425,  56.57453053, 219.2263058 ]), ([ 10.35416667,   8.60561983,  27.94141549, 256.0099888 ]), ([  9.04347826,   7.24529702,  14.86280039, 276.34021216]), ([ 11.22222222,  11.36194306,  48.05272551, 242.25465682]), ([  8.57142857,   9.12562411,  54.93928003, 260.37083518]), ([  7.84210526,  13.18251171,11.75271525, 301.6530248 ]), ([ 15.10344828,  13.51244109,  30.84775048, 275.11060061]), ([  9.36666667,   9.83018481,  41.76566772, 284.04329795]), ([ 11.44      ,  10.90746533,  27.78864228, 296.90841012]), ([  9.59375   ,  10.35199256,  20.67607313, 316.81774554]), ([ 11.62068966, 
 11.84079889,  55.80163184, 280.05384568]), ([ 10.48571429,  10.21492785,  18.43124233, 335.8188106 ]), ([  5.125     ,   8.79498555,  57.26123586, 305.14437925]), ([ 15.05      ,  12.16990345,  45.55628113, 304.97207864]), ([ 11.87179487,  10.17719344,  45.41667345, 326.1517997 ]), ([  8.52777778,  12.51216445,  14.24351704, 360.83576511]), ([  8.33333333,  10.26783002,  34.30696578, 348.12380904]), ([ 10.10714286,  11.72263966,  53.21627393, 341.99209529]), ([ 11.05555556,   9.08955444,  14.66469631, 387.21690286]), ([ 11.48780488,  12.34110238,  32.67828143, 369.61422434]), ([  9.9375    ,  10.44667542,  54.01624105, 365.75111861]), ([ 12.1025641 ,   9.42620461,  16.2934525 , 409.66899766]), ([  9.73333333,  10.40249009,  33.8628131 , 397.9914343 ]), ([  8.83333333,  10.09950494,  52.65506623, 386.45878018]), ([  8.11111111,   8.24792903,  18.76162191, 429.6411418 ]), ([ 10.35      ,   9.69552474,  51.6557227 , 406.8017388 ]), ([  9.13513514,  12.66532511,  37.8129986 , 424.62320994]), ([ 12.55172414,  13.75622224,  14.30689198, 444.65440026]), ([ 10.33333333,   9.59452969,  29.00393592, 455.73511187]), ([  6.47826087,  12.77806929,  55.07626436, 430.42190495]), ([ 10.51162791,  10.99201933,  16.98964149, 470.1001743 ]), ([  9.45238095,   8.9452758 ,  48.34262812, 445.19195553]), ([  9.56      ,   9.69552474,  14.72136407, 489.60941167]), ([ 10.21428571,  10.4962712 ,  39.97374138, 476.43579937]), ([ 11.32258065,  11.59814116,  56.20334717, 464.30011958]), ([  8.33333333,   8.92122936,  15.10502009, 511.56050931]), ([  9.19444444,  13.07324806,  
30.86095359, 495.03879532]), ([ 11.92307692,  10.44910319,  53.54572784, 490.60610443]), ([ 13.61764706,  12.29763248,  13.90567271, 528.9426002 
]), ([ 13.39393939,   8.87532252,  33.29056623, 516.06643131]), ([  8.46153846,   9.01186595,  25.44747462, 536.62362103]), ([  9.10344828, 
 10.02985318,  56.37200628, 515.85614175]), ([ 11.61290323,  10.06692589,  14.40655418, 558.34290381]), ([  9.87096774,  11.27235067,  38.68426585, 550.07247456]), ([ 11.25641026,  11.03176693,  52.16732297, 538.10805705]), ([ 11.36363636,  10.58917791,  28.65411347, 568.32050703]), ([ 11.06896552,  11.4925401 ,  15.54270325, 585.48935355]), ([ 11.8       ,  13.76899173,  51.1847677 , 562.66487006]), ([  8.        ,  10.56239891,  33.88578652, 589.72755244]), ([ 10.79411765,   8.5845792 ,  12.8515984 , 619.59299141]), ([ 10.08571429,  10.56119659,  51.04036338, 581.33241037]), ([ 12.64      ,  11.47303761,  25.30751351, 610.35767874]), ([  7.72727273,  11.33898964,  38.4073722 , 611.00928832]), ([ 11.09090909,   9.52566943,  53.16256985, 601.36045419]), ([ 12.        ,   6.81716583,  12.63537802, 645.43808282]), ([ 10.71875   ,  13.35028309,  26.10354232, 639.45063664]), ([ 11.69565217,  13.87584157,  51.72014814, 626.6348424 ]), ([ 10.97297297,  12.31047764,  16.13106246, 666.17935077]), ([  8.375     ,   9.87857827,  53.37011376, 640.82904152]), ([  8.74074074,  12.45605609,  34.81748611, 657.7033336 ]), ([ 12.06976744,   9.06606722,  19.74645124, 683.20797919]), ([ 11.91304348,   6.10361385,  51.42049491, 663.19253692]), ([  9.6744186 ,  10.851096  ,  15.41890105, 704.2046116 ]), ([  7.60869565,  10.23123761,  46.62604317, 679.85325671]), ([ 15.        ,  16.61827631,  54.88557594, 663.88991171]), ([ 11.51428571,  10.04179348,  36.82310167, 697.31533487]), ([ 10.70967742,  11.82619449,  14.71780689, 726.01918717]), ([ 11.96153846,   8.23498095,  
55.40127287, 697.950007  ]), ([  9.4       ,   6.53101319,  36.43583553, 722.78956973]), ([ 10.09090909,  12.30303329,  14.84917979, 748.3485377 
]), ([ 11.03846154,  13.75086442,  53.33366556, 715.18006794]), ([ 12.67741935,  10.62076971,  30.01365454, 741.75968156]), ([  5.5625    , 
  6.88028774,  12.31949357, 780.95251211]), ([  8.24      ,  12.28099801,  55.30160359, 737.61201682]), ([ 15.26315789,  13.55459873,  16.39576325, 774.59099224]), ([  9.87878788,  10.52796878,  48.4947897 , 751.31419668]), ([  9.55555556,  12.03524338,  39.24624992, 767.04402403]), ([  8.39130435,   9.04564355,  29.84546208, 781.4956336 ]), ([  9.69565217,   9.87995048,  14.50321651, 797.91663081]), ([  9.33333333,  11.48818687,  14.0137829 , 817.96842636]), ([ 13.57894737,  10.68421312,  36.78164588, 793.81611287]), ([ 10.65116279,  10.92155767,  54.84769166, 778.44613929]), ([  9.61290323,  13.19451452,  33.03725233, 808.32329763]), ([ 13.33333333,  11.02529289,  12.92254571, 841.11414156]), ([ 12.7    
   ,   7.47363365,  53.68886989, 805.12628761]), ([  9.67567568,  11.92833421,  30.80921167, 832.29576533]), ([ 12.19354839,   9.41534493,  14.05083679, 858.07926715]), ([  9.44444444,  11.74535019,  52.94095761, 822.29508611]), ([  7.55172414,   9.01990269,  16.30320249, 876.76056304]), ([ 14.38461538,  15.42116716,  48.45623292, 838.91841328]), ([ 14.89473684,   6.05970296,  45.05207513, 853.6679035 ]), ([ 12.47826087,  13.43673266,  32.1827573 , 861.86263089]), ([  8.56521739,   8.86999999,  56.09508536, 851.25490641]), ([ 11.68181818,   8.26323131,  31.7659669 , 879.98620329]), ([ 11.025     ,  10.98321162,  14.36987082, 895.48072718]), ([ 10.33333333,  10.40249009,  54.67672672, 871.42756211]), ([  7.89285714,  12.44403287,  41.74597622, 888.33271333]), ([ 11.44444444,   9.98728822,  27.49151946, 905.07595667]), ([ 13.13793103,   9.82089791,  
15.44764084, 920.53680063]), ([ 12.        ,   8.53408167,  55.7564772 , 895.34288669]), ([  9.44827586,  10.76119664,  42.30277031, 910.55524808]), ([  7.64285714,  10.4962712 ,  15.70396983, 939.67829493]), ([ 11.        ,  12.23684203,  32.63293402, 932.15431084]), ([  8.90909091, 
 11.9816854 ,  55.76274268, 911.94013448]), ([ 11.89285714,   9.99129596,  19.10075327, 959.22210691]), ([  8.81481481,  11.40870002,  32.97961294, 952.42671674]), ([ 11.44444444,  11.2964833 ,  55.18724704, 930.98486312]), ([ 10.26086957,  10.31905939,  16.30113592, 978.24794687]), ([  5.        ,  11.41683167,  53.4581369 , 948.34255414]), ([ 13.19047619,  10.09950494,  41.28650793, 965.99926421]), ([ 10.68965517,  10.34328609,  17.15876414, 995.06572629]), ([ 11.9       ,  11.00846038,  36.89530383, 983.90539992]), ([  9.43478261,  10.09950494,  57.59335153, 969.25834986]), ([   7.36111111,   10.49226346,   30.93753164, 1007.38422963]), ([  10.88235294,   12.86201658,   16.58139982, 1018.11416562]), ([ 
 9.94285714,   9.66666901,  51.63110833, 993.23917008]), ([   8.25806452,    6.2225982 ,   17.96372805, 1039.76192264]), ([  11.31428571,   14.13930691,   50.33146944, 1010.56768851]), ([   9.4137931 ,    9.85572378,   39.54596056, 1029.14559855]), ([  16.91666667,   17.08499585,   17.23006094, 1039.43214298]), ([   6.14285714,   13.34577438,   19.93764194, 1057.23653929]), ([  12.32142857,    8.5845792 ,   56.07154117, 1029.37306931]), ([  12.68965517,    9.75124615,   37.54965005, 1047.39758035]), ([  15.24137931,   11.80597301,   18.06185699, 1069.02427753]), ([   9.7       ,   11.61443068,   16.0584168 , 1089.21553239]), ([   8.75757576,    7.6511401 ,   42.31285268, 1069.14094503]), ([  10.34146341,   13.27715405,   55.774968  , 1057.77445338]), ([  10.07407407,    8.0047928 ,   31.60120806, 1087.91881077]), ([  10.84615385,    7.84653845,   18.8205281 , 1106.43499022]), ([  11.53125   ,   10.730724  ,   52.2501598 , 1091.61051086]), ([   8.03846154,   11.65327493,   40.23881924, 1107.38927051]), ([  15.94117647,   13.84226265,   24.48695719, 1114.64304821]), ([   9.78947368,   11.42838717,   15.34382269, 1133.91937892]), ([   
8.4375    ,   11.23569924,   13.35329723, 1154.80175936]), ([  12.56666667,   11.51343563,   33.90875993, 1133.92179718]), ([  13.15      ,    9.84701731,   54.72267355, 1118.50663599]), ([   8.2       ,    9.96484487,   31.51952481, 1152.11674153]), ([   9.42424242,   10.68099159,   52.17053603, 1139.98260164]), ([  11.86956522,   12.11940593,   12.64536646, 1175.71942791]), ([  10.66666667,   12.54021863,   32.58395969, 1170.87836344]), ([  10.16666667,    9.67869223,   49.39284136, 1158.31956347]), ([  10.40625   ,   11.8037964 ,   14.6455518 , 1196.45543168]), ([  
10.96969697,   10.58917791,   33.45764561, 1187.51668491]), ([  10.62790698,   12.82402255,   53.05255973, 1177.41421085]), ([   9.89655172,   10.8308484 ,   12.92848711, 1221.07659462]), ([  10.92307692,   12.01582126,   32.05674928, 1211.40582302]), ([  10.02564103,   11.10945543,   51.88457325, 1198.47002342]), ([   8.91176471,    8.82221461,   27.24376695, 1239.30760677]), ([  10.04      ,    9.29154454,   14.11486592, 1252.74948678]), ([   9.75862069,   12.43283884,   52.99729089, 1214.70741348]), ([  10.36363636,   10.49736422,   46.40629747, 1234.71660943]), ([ 
 10.37037037,    8.71549871,   12.60985201, 1271.09350307]), ([   9.85714286,   13.67761526,   30.48243924, 1264.11541956]), ([  10.53658537,    
8.32593334,   50.2613485 , 1258.18107439]), ([  10.18181818,   12.63968345,   23.80881148, 1286.76183593]), ([  11.        ,   13.48580954,   16.62194114, 1304.9034623 ]), ([  11.13043478,   11.70225246,   55.16616033, 1278.68027902]), ([  11.14705882,   10.63418461,   41.75755945, 1297.40331813]), ([  10.91071429,   10.08147011,   19.69149822, 1325.48397375]), ([  10.26666667,   11.51343563,   12.31375022, 1347.11508454]), ([  10.90625   ,   11.45662591,   40.87831958, 1320.29649469]), ([  10.48148148,    8.93993215,   54.47251859, 1312.80301356]), ([  10.375     ,   
 9.43672493,   34.63242249, 1336.66505258]), ([  10.75      ,    7.00653155,   11.88874205, 1370.39289687]), ([   6.76190476,    8.464347  ,   41.61469957, 1357.66316375]), ([  13.31578947,   13.18251171,   26.47988313, 1362.51694533]), ([  12.2       ,   11.76592325,   54.06793123, 1343.60015211]), ([   7.46428571,   11.10945543,   35.54315428, 1373.33431442]), ([  10.04166667,   11.95108084,   57.66327061, 1368.23913925])]

def euclid_dist(vec1, vec2):
    return np.sum(np.square(np.subtract(vec1, vec2))) ** 0.5

def predict(features):
    features = features * clustering_weights
    dists = []
    for i in range(number_clusters):
        dists.append(euclid_dist(features, sorted_clusters[i]))
    cluster_number = dists.index(min(dists))
    return cluster_number + 1

def profile_level(stars,forks,repositories,commits):
  features = [stars,forks,repositories,commits]
  return(predict(features)/40)




def commitsperday(total_commits,user):
    
    dates_of_creation = []
    for repo in user.get_repos():
        if repo.language is not None:   #removed forked repos
            dates_of_creation.append(repo.created_at)
    
    min_date = str(min(dates_of_creation))
    today_date = str(date.today())
    d0 = date(int((min_date)[0:4]),int((min_date)[5:7]),int((min_date)[8:11]))   #DATE OF FIRST PUSH
    d1 = date(int((today_date)[0:4]),int((today_date)[5:7]),int((today_date)[8:11]))  #TODAY'S DATE
    days = (d1 - d0).days
    
    return total_commits/days

"""X2 = df2[['t_lang','t_deploy']].values"""
scoring_weights_2 = np.array([1, 1.9])
clustering_weights_2 = scoring_weights_2**0.5



#X2 = X2 * clustering_weights_2
number_clusters_2 = 60

"""
kmeans = KMeans(n_clusters = number_clusters, init = 'k-means++') # With 60 clusters to level from 1 to 200
y_kmeans = kmeans.fit(X2)
"""

def givescores_2(x):
    return np.dot(x, np.array([1,1]).T)

# Now to sort the clusters on a criteria
"""scores_2 = givescores_2(kmeans.cluster_centers_)"""
#sorted_clusters_2= [x for (y, x) in sorted(zip(scores_2, kmeans.cluster_centers_))]



"""res = {} 
a =list(kmeans.cluster_centers_)
for key in scores_2: 
    for value in a: 
        res[key] = value 
        a.remove(value) 
        break

final={k: v for k, v in sorted(res.items())}
sorted_clusters_2 = list(final.values())
print(sorted_clusters_2)
print("===============================================")
print(sorted_clusters)
"""

sorted_clusters_2=[([1.0000000e+00, 4.4408921e-16]), ([2.0000000e+00, 4.4408921e-16]), ([1.        , 1.37840488]), ([1.        , 1.37840488]), ([3.0000000e+00, 8.8817842e-16]), ([2.        , 1.37840488]), ([1.        , 2.75680975]), ([4.0000000e+00, 4.4408921e-16]), ([3.        , 1.37840488]), ([2.        , 2.75680975]), ([5.00000000e+00, 1.33226763e-15]), ([1.        , 4.13521463]), ([4.        , 1.37840488]), ([3.        , 2.75680975]), ([6., 0.]), ([2.        , 4.13521463]), ([5.        , 1.37840488]), ([1.       , 5.5136195]), ([4.  
      , 2.75680975]), ([7., 0.]), ([3.        , 4.13521463]), ([6.        , 1.37840488]), ([2.       , 5.5136195]), ([5.        , 
2.75680975]), ([1.        , 6.89202438]), ([ 8.0000000e+00, -4.4408921e-16]), ([4.        , 4.13521463]), ([7.        , 1.37840488]), ([3.       , 5.5136195]), ([6.        , 2.75680975]), ([5.42733333, 3.44991767]), ([2.        , 6.89202438]), ([9., 0.]), ([5.        , 4.13521463]), ([8.        , 1.37840488]), ([4.       , 5.5136195]), ([7.        , 2.75680975]), ([3.        , 6.89202438]), ([1.0000000e+01, 4.4408921e-16]), ([6.        , 4.13521463]), ([9.        , 1.37840488]), ([5.       , 5.5136195]), ([8.        , 2.75680975]), ([4.        , 6.89202438]), ([7.        , 4.13521463]), ([10.        ,  1.37840488]), ([6.       , 5.5136195]), ([9. 
       , 2.75680975]), ([5.        , 6.89202438]), ([8.        , 4.13521463]), ([7.       , 5.5136195]), ([10.        ,  2.75680975]), 
([6.        , 6.89202438]), ([9.        , 4.13521463]), ([8.       , 5.5136195]), ([7.        , 6.89202438]), ([10.        ,  4.13521463]), ([9.       , 5.5136195]), ([8.        , 6.89202438]), ([10.       ,  5.5136195]), ([9.        , 6.89202438]), ([10.     
   ,  6.89202438])]

def euclid_dist_2(vec1, vec2):
    return np.sum(np.square(np.subtract(vec1, vec2))) ** 0.5

def predict_2(features_2):
    features_2 = features_2 * clustering_weights_2
    dists_2 = []
    for i in range(number_clusters_2):
        dists_2.append(euclid_dist_2(features_2, sorted_clusters_2[i]))
    cluster_number_2 = dists_2.index(min(dists_2))
    return cluster_number_2 + 1

def profile_level_2(num_languages,num_deploy):
  features = [num_languages,num_deploy]
  return(predict_2(features)/12)

def find_languages(repo,user):   #calculating number of languages for best repo evaluation
    
    
      #removed forked repos
    
    url = "https://api.github.com/repos/"+repo.full_name+"/languages"
    
    response = urllib.request.urlopen(url)
    webContent = response.read()
    res_dict = json.loads(webContent.decode('utf-8')) 
    for lang in res_dict:
        if lang not in retld.keys():
            retld[lang]=1
        else:
            retld[lang]+=1





def deployment_counts(repo,user):   # Verifying status of deployments for best repo evaluation
    
    count = 0

    url = "https://api.github.com/repos/"+repo.full_name+"/deployments"

    response = urllib.request.urlopen(url)
    webContent = response.read()
    res_dict = json.loads(webContent.decode('utf-8')) 
    if res_dict!=[]:
        if res_dict[0].get("environment")!='github-pages':   #CHECKING IF MODEL IS DEPLOYED OR NOT 
            count+=1
            
    return count



#g = Github(username,password)

def final_score(access_token,best_repos):

    global finalretlist
    finalretlist={}
    global g
    g = Github(access_token)

    user = g.get_user()

    tc = total_commits(user)
    global username
    username = user.login

    url = f"https://api.github.com/users/{username}"
    user_data = requests.get(url).json()


    data_forks = 0
    data_stars = 0

    global retld
    retld={}

    langdetails={}
    chrat_js={}
    sum_forks,sum_stars,sum_repos=0,0,0
    for repo in user.get_repos():
        if repo.language!=None:
            if str(username) in str(repo.full_name) :
                chrat_js[repo.full_name]=repo.get_languages()

            # if repo.language not in langdetails.keys():
            #     langdetails[repo.language]=1
            # else:
            #     langdetails[repo.language]+=1
            data_forks+=repo.forks 
            data_stars+=repo.stargazers_count 
            sum_stars = sum_stars+repo.stargazers_count
            sum_forks = sum_forks+repo.forks
            sum_repos = sum_repos+1
    for repo in chrat_js:
        # print(repo)
        for i in chrat_js[repo]:
            # print("        ",i)
            if i in langdetails.keys():
                langdetails[i]+=1
            else:
                langdetails[i]=1
    #best_repos = ['Detection-of-Fraud-Transactions','image-processing']   # input of 5 best repos
    score2=0
    dc=0
    num_lang=0
    for best in best_repos:
        for repo in user.get_repos():
            if repo.full_name[len(username)+1:]==best and repo.language!=None:#CHECKING WHETHER THE REPO EXISTS OR NOT
                dc+=deployment_counts(repo,user)
                find_languages(repo,user)
            else:
                pass
    score2 += profile_level_2(len(retld),dc)
    data_dict = {}
    for repo in user.get_repos():
        if repo.language!=None:
            create = repo.created_at
            last = repo.pushed_at
            d0 = date(int(str(create)[0:4]),int(str(create)[5:7]),int(str(create)[8:11]))   #DATE OF FIRST PUSH
            d1 = date(int(str(last)[0:4]),int(str(last)[5:7]),int(str(last)[8:11]))
            days = (d1 - d0).days
            data_dict[repo.full_name[len(username)+1:]] = days+1


    commits_per_lang={}
    commits_per_repo={}
    commits_per_repo_num=0
    for repo in user.get_repos():
        if str(username) in str(repo.full_name) and repo.fork == False and repo.language:
            commits_per_repo_num=0
            for commit in repo.get_commits():
                commits_per_repo_num+=1
                # print(repo.full_name,"   ",commit.files)
                for commitedfiles in commit.files:
                    if "/" not in list(commitedfiles.filename):
                        try:
                            abc=(str(commitedfiles.filename).split(".")[1])
                        except:
                            abc=(str(commitedfiles.filename))
                        if abc in commits_per_lang.keys() :
                            commits_per_lang[abc]+=1
                        else:
                            commits_per_lang[abc]=1
            commits_per_repo[repo.full_name]=commits_per_repo_num        




    finalretlist["data_dict"] = data_dict
    finalretlist["Time"] = sum(data_dict.values())/sum_repos
    finalretlist["data_forks"] = data_forks
    finalretlist["data_stars"] = data_stars
    finalretlist["lang_details_used_in_repos"] = langdetails
    finalretlist["chrat_js"] = chrat_js
    finalretlist["commits_per_lang"] = commits_per_lang
    finalretlist["commits_per_repo"] = commits_per_repo

    
    
    # langdet = requests.get("https://api.github.com/repos/dotnet/corefx/languages")
    # print(langdet.status_code)

    # print(finalretlist)

    score1 = profile_level(sum_stars,sum_forks,sum_repos,tc)

    commit_score = commitsperday(tc,user)*0.1
    if score1+score2+commit_score>10:
        tribe_score = 10
    else:
        tribe_score = score1+score2+commit_score
    print("score1->{}   score2->{}   commit_score->{}".format(score1,score2,commit_score))

    finalretlist["tribe_score"] = tribe_score
    return finalretlist


#print(tribe_score)

@app.route('/gitscore', methods = ['POST'])
def prossesjson():
    data = request.get_json()
    print(data)
    access_token=data['access_token']
    best_repos=data['best_repos']

    finalscore =final_score(access_token,best_repos)

    return jsonify(finalscore)

if __name__ == "__main__":
    app.run(debug=True)

"""
{
	"access_token" : "",
	"best_repos" : ["",""]
}


"""
