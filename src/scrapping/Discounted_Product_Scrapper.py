import pandas as pd

class Discounted_Product_Scrapper():
    def __init__(self, driver):
        self.driver = driver
        self.url = None


    def scrape(self):
        gg_firsatlar ='https://www.gittigidiyor.com/yildiz-firsatlar'
        products = self.gg_yildiz_firsatlar(gg_firsatlar)

        n11_firsatlar = 'https://www.n11.com/super-firsatlar'
        products_df = self.get_n11_discounted_products(n11_firsatlar)

        return pd.concat([products,products_df])

    def gg_yildiz_firsatlar(self,link):
    
        products = list()
        self.driver.get(link)

        product_links = self.driver.find_element_by_class_name("catalog-view")
        columns = self.driver.find_elements_by_class_name("product-info-con")

        for i,column in enumerate(columns):
            try:

                prod_link = product_links.find_element_by_xpath('li[{}]/a'.format(i+1)).get_attribute('href')
                #print(prod_link)

                aProduct = column.find_element_by_class_name("product-title")
                title = aProduct.find_element_by_tag_name('span')
                #print(title.text)

                price = column.find_element_by_class_name('fiyat')
                #print(price.text)

                products.append([prod_link,title.text,price.text])

            except:
                pass
        products_df = pd.DataFrame(products,columns=['product_link','product_name','product_price'])

        return products_df

    def get_n11_discounted_products(self,link):
        
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
                '''
                print(link)
                print(title)
                print(price)
                '''
                products.append([link,title,price.text])
            except:
                pass

        products_df = pd.DataFrame(products,columns=['product_link','product_name','product_price'])
        return products_df