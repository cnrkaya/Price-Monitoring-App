import sys 
import json
import pandas as pd
from uuid import uuid4
from selenium import webdriver

class DiscountedProductScrapper():
    def __init__(self, driver):
        self.driver = driver
        self.gittigidiyor_url = 'https://www.gittigidiyor.com/yildiz-firsatlar'
        self.n11_url = 'https://www.n11.com/super-firsatlar'
        self.products = []


    def set_page_urls(self,gittigidiyor_url, n11_url):

        self.gittigidiyor_url = gittigidiyor_url
        self.n11_url = n11_url

    def scrape(self):

        self.__gg_yildiz_firsatlar(self.gittigidiyor_url)
        self.__get_n11_discounted_products(self.n11_url)

        return self.products

    def __gg_yildiz_firsatlar(self,link):
        
        self.driver.get(link)

        catalog_view = self.driver.find_element_by_class_name("catalog-view")
        columns = self.driver.find_elements_by_class_name("product-info-con")
        product_links = driver.find_elements_by_class_name("product-link")
        
        for i,column in enumerate(columns):
            try:

                product_link = catalog_view.find_element_by_xpath('li[{}]/a'.format(i+1)).get_attribute('href')
                #print(prod_link)

                aProduct = column.find_element_by_class_name("product-title")
                title = aProduct.find_element_by_tag_name('span')
                #print(title.text)

                price = column.find_element_by_class_name('fiyat')
                #print(price.text)
                
                img = product_links[i].find_element_by_class_name("img-cont")
                image_url = img.get_attribute('data-original')
                
                self.products.append({
                    'id': str(uuid4()),
                    'hostname': 'gittigidiyor.com',
                    'productName': title.text,
                    'currentPrice': self.format_price(price.text),
                    'imageURL': image_url,
                    'productURL': product_link
                })

            except:
                pass

    def __get_n11_discounted_products(self,link):
        
        products = list()

        self.driver.get(link)
        columns  = self.driver.find_elements_by_class_name("column")
        for column in columns:
            try:
                proDetail = column.find_element_by_class_name("proDetail")
                ss = proDetail.find_element_by_tag_name('a')
                link = ss.get_attribute("href")
                title = ss.get_attribute("title")
                price = proDetail.find_element_by_tag_name('ins')
                img = column.find_element_by_class_name("lazy")
                img_URL = img.get_attribute('data-original')
                
                self.products.append({
                    'id': str(uuid4()),
                    'hostname': 'n11.com',
                    'productName': title,
                    'currentPrice': self.format_price(price.text),
                    'imageURL': img_URL,
                    'productURL': link
                })     

            except:
                pass
            
    def format_price(self, price_string):
        price_string = price_string.replace(' TL', '')
        price_string = price_string.replace('.', '')
        price_string = price_string.replace(',', '.')
        price = float(price_string)
        price = '{:.2f}'.format(price)
        return price

driver_path="./src/scripts/chromedriver.exe"

if __name__ == '__main__':
    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    
    # Create a new instance of the Chrome driver
    driver = webdriver.Chrome(executable_path=driver_path, chrome_options=options)
    
    # Scrape discounted products
    discountedProductScrapper = DiscountedProductScrapper(driver)
    products = discountedProductScrapper.scrape()
    
    # Convert the dictionary array to JSON
    result = json.dumps(products)
    
    # Send the result
    print(result)
    sys.stdout.flush()