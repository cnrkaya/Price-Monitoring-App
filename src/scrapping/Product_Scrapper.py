
class GittiGidiyor_Scrapper():
    def __init__(self, driver):
        self.driver = driver
        self.url = None
        
    def scrape(self, url):
        # Go to the given product
        self.driver.get(url)
        try:
            return  self.scrape_product_name(),self.scrape_lowPrice()
        except Exception:
            pass
        try:
            return  self.scrape_product_name(), self.scrape_highPrice()
        except Exception:
            return  self.scrape_product_name(), 0.0
        
    def scrape_lowPrice(self):
        # Find the element
        price_string = self.driver.find_element_by_id('sp-price-highPrice').text
        return self.string_to_float(price_string)
    
    def scrape_highPrice(self): 
        # Find the element
        price_string = self.driver.find_element_by_id('sp-price-lowPrice').text
        return self.string_to_float(price_string)   

    def scrape_product_name(self):
        return self.driver.find_element_by_id('sp-title').text
    
    def string_to_float(self, price_string):
        price_string = price_string.replace(' TL', '')
        price_string = price_string.replace('.', '')
        price_string = price_string.replace(',', '.')
        price = float(price_string)

        return price


class N11_Scrapper:
    def __init__(self, driver):
        self.driver = driver
        self.url = None
        
    def scrape(self, url):
        # Go to the given product
        self.driver.get(url)
        try:
            return self.scrape_product_name(),self.scrape_newPrice()
        except Exception:
            pass
        try:
            return self.scrape_product_name(),self.scrape_price_amount()
        except Exception:
            return self.scrape_product_name(),0.0
        
    def scrape_newPrice(self):
        # Find the element
        price_string = self.driver.find_element_by_class_name('newPrice').find_element_by_xpath('//ins').text
        return self.string_to_float(price_string)
    
    def scrape_price_amount(self):
        # Find the element
        price_string = self.driver.find_element_by_class_name('price-amount').text
        return self.string_to_float(price_string)   

    def scrape_product_name(self):
        return self.driver.find_element_by_class_name('proName').text

    def string_to_float(self, price_string):
        price_string = price_string.replace(' TL', '')
        price_string = price_string.replace('.', '')
        price_string = price_string.replace(',', '.')
        price = float(price_string)
        return price

class Trendyol_Scrapper:    
    def __init__(self, driver):
        self.driver = driver
        self.url = None
        
    def scrape(self, url):
        # Go to the given product
        self.driver.get(url)   
        try:
            return self.scrape_product_name(),self.scrape_prc_slg()
        except Exception:
            pass
        try:
            return self.scrape_product_name(),self.scrape_prc_dsc()
        except Exception:
            return self.scrape_product_name(), 0.0
        
    def scrape_prc_slg(self):
        # Find the element
        price_string = self.driver.find_element_by_class_name('prc-slg').text
        return self.string_to_float(price_string)
    
    def scrape_prc_dsc(self):
        # Find the element
        price_string = self.driver.find_element_by_class_name('prc-dsc').text
        return self.string_to_float(price_string)   

    def scrape_product_name(self):
        return self.driver.find_element_by_class_name('pr-new-br').text
  
    def string_to_float(self, price_string):
        price_string = price_string.replace(' TL', '')
        price_string = price_string.replace(',', '.')
        price = float(price_string)
        return price