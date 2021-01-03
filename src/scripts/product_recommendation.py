import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

class Recommendation():
    def __init__(self, products):
        self.products = products
        self.product_names = [product['productName'] for product in self.products]
        self.cosine_similaritie = None
        
    def __fit(self):
        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(self.product_names)
        self.cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    
    def find_most_similar_product(self, product_name):
        self.product_names.append(product_name)
        self.__fit()
        similarity_score, most_similar_product_index = self.__get_max(self.cosine_similarities[-1])
        return self.products[most_similar_product_index]
        
    def __get_max(self, arr):
        max = 0 
        index = 0
        for i in range(len(arr)):
            if arr[i] < 0.98 and arr[i] > max:
                max = arr[i]
                index = i
        return max,index 
    
def read_json_file(path):
    data = None
    with open(path, encoding='utf8') as json_file:
        data = json.load(json_file)
    return data
    
if __name__ == '__main__':
    # Get inputs
    product_name = sys.argv[1]
    
    # Read discounted products
    products = read_json_file('./cache/discounted_products.json')
    
    if products is None:
        print('Discounted products could not be read!')
    else:
        # Recommend a product
        recommendation = Recommendation(products)
        recommended_product = recommendation.find_most_similar_product(product_name)
        
        # Convert it to JSON object
        result = json.dumps(recommended_product)
        
        # Send the result
        print(result)
        sys.stdout.flush()