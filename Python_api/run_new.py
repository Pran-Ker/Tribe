#!/usr/bin/env python
# coding: utf-8

# In[ ]:


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

df = pd.read_csv("dataset1.csv")
df2 = pd.read_csv("dataset2.csv")

X = df[['t_stars','t_forks','t_repos','t_commits']].values
scoring_weights = np.array([1, 1.02, 1.9,1.9])
clustering_weights = scoring_weights**0.5

X = X * clustering_weights
number_clusters = 200


kmeans = KMeans(n_clusters = number_clusters, init = 'k-means++') # With 200 clusters to level from 1 to 200
y_kmeans = kmeans.fit(X)


def givescores(x):
    return np.dot(x, np.array([1,1,1,1]).T)

# Now to sort the clusters on a criteria
scores = givescores(kmeans.cluster_centers_)
sorted_clusters = [x for (y, x) in sorted(zip(scores, kmeans.cluster_centers_))]

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

X2 = df2[['t_lang','t_deploy']].values
scoring_weights_2 = np.array([1, 1.9])
clustering_weights_2 = scoring_weights_2**0.5



X2 = X2 * clustering_weights_2
number_clusters_2 = 60


kmeans = KMeans(n_clusters = number_clusters, init = 'k-means++') # With 60 clusters to level from 1 to 200
y_kmeans = kmeans.fit(X2)


def givescores_2(x):
    return np.dot(x, np.array([1,1]).T)

# Now to sort the clusters on a criteria
scores_2 = givescores_2(kmeans.cluster_centers_)
#sorted_clusters_2= [x for (y, x) in sorted(zip(scores_2, kmeans.cluster_centers_))]

res = {} 
a =list(kmeans.cluster_centers_)
for key in scores_2: 
    for value in a: 
        res[key] = value 
        a.remove(value) 
        break

final={k: v for k, v in sorted(res.items())}
sorted_clusters_2 = list(final.values())
#print(sorted_clusters_2)

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
    
    languages = []
      #removed forked repos

    url = "https://api.github.com/repos/"+repo.full_name+"/languages"

    response = urllib.request.urlopen(url)
    webContent = response.read()
    res_dict = json.loads(webContent.decode('utf-8')) 
    for lang in res_dict:
        if lang not in languages:
            languages.append(lang)
   
    return len(languages)

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


    global g
    g = Github(access_token)

    user = g.get_user()

    tc = total_commits(user)
    global username
    username = user.login

    sum_forks,sum_stars,sum_repos=0,0,0
    for repo in user.get_repos():
        if repo.language!=None:  #removing forked repos
            sum_stars = sum_stars+repo.stargazers_count
            sum_forks = sum_forks+repo.forks
            sum_repos = sum_repos+1

    #best_repos = ['Detection-of-Fraud-Transactions','image-processing']   # input of 5 best repos
    score2=0
    for best in best_repos:
        for repo in user.get_repos():
            if repo.full_name[len(username)+1:]==best and repo.language!=None:#CHECKING WHETHER THE REPO EXISTS OR NOT
                score2 += profile_level_2(find_languages(repo,user),deployment_counts(repo,user))#SCORE2
            else:
                pass
            
    score1 = profile_level(sum_stars,sum_forks,sum_repos,tc)

    commit_score = commitsperday(tc,user)*0.1
    if score1+score2+commit_score>10:
        tribe_score = 10
    else:
        tribe_score = score1+score2+commit_score
    print("score1->{}   score2->{}   commit_score->{}".format(score1,score2,commit_score))
    return tribe_score


#print(tribe_score)

@app.route('/gitscore', methods = ['POST'])
def prossesjson():
    data = request.get_json()
    print(data)
    access_token=data['access_token']
    best_repos=data['best_repos']

    finalscore =final_score(access_token,best_repos)

    return jsonify({'tribe_score': finalscore})

if __name__ == "__main__":
    app.run()

"""
{
	"access_token" : "",
	"best_repos" : ["",""]
}

"""


# In[ ]:




