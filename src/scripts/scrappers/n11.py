class N11Scrapper:
    def __init__(self, driver):
        self.driver = driver
        self.url = None
        
    def scrape(self, url):
        # Go to the given product
        self.driver.get(url)
        # Scrape product image
        img_url = self.scrape_product_image()
        # Scrape product name
        product_name = self.scrape_product_name()
        # Scrape product price
        price = self.scrape_price()
        return img_url, product_name, price
    
    def scrape_product_image(self):
        # Find the element
        img_obj = self.driver.find_element_by_css_selector("div[class='imgObj']>a")
        img_url = img_obj.get_attribute("href")
        return img_url
    
    def scrape_product_name(self):
        try:
            return self.driver.find_element_by_class_name("pro-title_main").text
        except Exception:
            pass
        try:
            return self.driver.find_element_by_class_name("proName").text
        except Exception:
            return ''
    
    def scrape_price(self):
        try:
            return self.scrape_newPrice()
        except Exception:
            pass
        try:
            return self.scrape_price_amount()
        except Exception as e:
            return 0.0
        
    def scrape_newPrice(self):
        # Find the element
        price_string = self.driver.find_element_by_class_name('newPrice').find_element_by_xpath('//ins').text
        return self.string_to_float(price_string)
    
    def scrape_price_amount(self):
        # Find the element
        price_string = self.driver.find_element_by_class_name('price-amount').text
        return self.string_to_float(price_string)   
    
    def string_to_float(self, price_string):
        price_string = price_string.replace(' TL', '')
        price_string = price_string.replace('.', '')
        price_string = price_string.replace(',', '.')
        price = float(price_string)
        return price