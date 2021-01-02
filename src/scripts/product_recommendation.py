from selenium import webdriver
from datetime import datetime

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

from ProductScrapper import *
from DiscountedProductScrapper import *

product_success_message = 'Product has been added succesfully'
product_error_message = 'Product could not be added'

class Recommendation():

    def __init__(self):
        self.create_webdriver()
        self.discountedProductScrapper = DiscountedProductScrapper(self.driver)
        self.refresh_discounted_products()

    

    def find_similariest_product(self,product_name):

        names = self.df_discountedProducts['product_name'].str.lower()
        #add target product to the end of the list
        names = names.append(pd.Series(product_name), ignore_index=True)

        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(names)

        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
        #find similariest product of the target product
        similarity_score, similar_prod_index = self.get_max(cosine_sim[-1])

        name = names[similar_prod_index]
        url = self.df_discountedProducts['product_link'][similar_prod_index]
        price = self.df_discountedProducts['product_price'][similar_prod_index]
        website = self.df_discountedProducts['website'][similar_prod_index]

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

        product  = {"name": name, "website": website, "current_price": price,
            "url" :url, "datetime":dt_string}

        return product

    def get_max(self,arr):
        max = 0 
        index = 0
        for i in range(len(arr)):
            if arr[i] < 0.98 and arr[i] > max:
                max = arr[i]
                index = i
        return max,index

    def refresh_discounted_products(self):
        self.df_discountedProducts = self.discountedProductScrapper.scrape()

    def create_webdriver(self):
        # driver_path="./chromedriver"  #for linux
        driver_path="./chromedriver.exe"   #ChromeDriver 87.0.4280.88 is used for Chrome version 87, 
        
        #chrome options
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        #chrome_options.add_argument('--no-sandbox')
        #chrome_options.add_argument('--disable-dev-shm-usage') #only on Linux OS:

        # Create a new instance of the Chrome driver
        self.driver = webdriver.Chrome('chromedriver',chrome_options=chrome_options)

    

class UserProductsMonitoring():

    def __init__(self,username):
        self.create_webdriver()
        self.username = username
        self.products = list()
        self.initialize_scrappers()

    def initialize_scrappers(self):
        self.gittiGidiyorScrapper = GittiGidiyorScrapper(self.driver)
        self.trendyolScrapper = TrendyolScrapper(self.driver)
        self.n11Scrapper = N11Scrapper(self.driver)

    def create_webdriver(self):
        # driver_path="./chromedriver"  #for linux
        driver_path="./chromedriver.exe"   #ChromeDriver 87.0.4280.88 is used for Chrome version 87, 
        
        #chrome options
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        #chrome_options.add_argument('--no-sandbox')
        #chrome_options.add_argument('--disable-dev-shm-usage') #only on Linux OS:

        # Create a new instance of the Chrome driver
        self.driver = webdriver.Chrome('chromedriver',chrome_options=chrome_options)

    def monitor_product(self,product_url):

        if 'n11.com' in product_url :
            website = 'N11'
            try:
                product_name, product_price = self.n11Scrapper.scrape(product_url)       
            except:
                return None
            
        elif 'gittigidiyor.com' in product_url:

            website = 'GittiGidiyor'
            try:
                product_name, product_price = self.gittiGidiyorScrapper.scrape(product_url)    
            except:
                return None      

        elif 'trendyol.com' in product_url:

            website = 'Trendyol'

            try:
                product_name, product_price = self.trendyolScrapper.scrape(product_url)   
            except:
                return None

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

        product  = {"name": product_name, "website": website, "current_price": product_price,
                    "url" :product_url, "datetime":dt_string}
        #print(product)

        return product

    def add_product_for_monitoring(self,product_url):
        
        product = self.monitor_product(product_url)
        if  product == None:
            return product_error_message 

        product['prev_price']  = product['current_price']
        self.products.append(product)
        return product_success_message 

    def refresh_product_prices(self):

        for i,product in enumerate(self.products):

            new_product = self.monitor_product(product['url'])
            if  new_product == None:
                print('Something went wrong')
                continue

            #update price
            new_product['prev_price'] = product['current_price']

            #update datetime
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
            new_product['datetime'] = dt_string

            self.products[i]  = new_product



if __name__ == "__main__":

    aUser  = UserProductsMonitoring('caner')

    msg = aUser.add_product_for_monitoring('https://www.gittigidiyor.com/televizyon/quax-q55gzt6500and_spp_855788?id=623038715')
    print(msg)
    print(aUser.products)

    msg = aUser.add_product_for_monitoring('https://www.trendyol.com/lc-waikiki/kadin-deve-tuyu-kase-kaban-p-57594159?boutiqueId=533989&merchantId=4171')
    print(msg)
    print(aUser.products)

    msg = aUser.add_product_for_monitoring('https://urun.n11.com/klasik-gitar/barcelona-lc-3900-cor-cut-orange-yellow-P432154368')
    print(msg)
    print(aUser.products)

    aUser.refresh_product_prices()
    print(aUser.products)

    rec = Recommendation()   # biraz zaman alıyor programın başında başlat
    
    for deneme in aUser.products:
        print(deneme['name'] + ' Similar with :')
        prod = rec.find_similariest_product(deneme['name'])
        print(prod)
        

