class GittiGidiyorScrapper():
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