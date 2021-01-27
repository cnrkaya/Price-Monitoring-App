import sys 
import os
import json
from selenium import webdriver
from scrappers.n11 import N11Scrapper
from scrappers.gittigidiyor import GittiGidiyorScrapper
from scrappers.trendyol import TrendyolScrapper

driver_path="./src/scripts/chromedriver"

def scrape_product(hostname, product_url,driver):
    
    scrapper = None
    if hostname == 'urun.n11.com' or hostname == 'www.n11.com':
        scrapper = N11Scrapper(driver)
    elif hostname == 'www.gittigidiyor.com':
        scrapper = GittiGidiyorScrapper(driver)
    elif hostname == 'www.trendyol.com':
        scrapper = TrendyolScrapper(driver)
    
    return scrapper.scrape(product_url)
    
    
if __name__ == '__main__':
    # Get inputs
    hostname = sys.argv[1]
    product_url = sys.argv[2]


    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)
    
    # Scrape price and product image URL
    img_url, product_name, price = scrape_product(hostname, product_url,driver)
    
    # Format the price
    price = '{:.2f}'.format(price)
    
    # Create a dictionary
    result = {
        'hostname': hostname,
        'productName': product_name,
        'currentPrice': price,
        'imageURL': img_url,
        'productURL': product_url
    }
    
    # Convert the dictionary to JSON
    result = json.dumps(result)

    # Send the result
    print(result)
    sys.stdout.flush()