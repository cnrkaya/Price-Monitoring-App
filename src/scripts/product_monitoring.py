import sys 
import json
from selenium import webdriver

from product_scraping import scrape_product


driver_path="./src/scripts/chromedriver"

        
def string_toList(x):
     return x.strip('[]').replace('"', '').replace(' ', '').split(',')

if __name__ == '__main__':

    if len(sys.argv) != 5:
        print("Wrong number of arguments passed!")
        print ("Usage: product_monitoring.py [idlist] [hostnameList] "+ 
        "[product_urlList] [prev_pricesList] ")
        print('Example list format: ["id1","id2","id3"]')
        exit()

    # Get inputs
    ids = string_toList(sys.argv[1])       
    hostnames = string_toList(sys.argv[2])
    product_urls = string_toList(sys.argv[3])
    prev_prices = string_toList(sys.argv[4])

    #Options for driver
    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    # Create a new instance of the Chrome driver
    driver = webdriver.Chrome(executable_path=driver_path, chrome_options=options)

    changed_products = list()
    changed_ids = list()

    for i in range(len(ids)):

        # Scrape price and product image URL
        img_url, product_name, price = scrape_product(hostnames[i], product_urls[i],driver)
        
        #Price comparison
        if price != prev_prices[i] : #TODO check whether datatypes is same type

            # Format the price
            price = '{:.2f}'.format(price)
            
            # Create a dictionary
            product = {
                'hostname': hostnames[i],
                'productName': product_name,
                'currentPrice': price,
                'imageURL': img_url,
                'productURL': product_urls[i]
            }

            changed_products.append(product)
            changed_ids.append(ids[i])

    result = {
        'changed_products':changed_products,
        'changed_ids': changed_ids
    }      

    # Convert the dictionary to JSON
    result = json.dumps(result)

    # Send the result
    print(result)
    sys.stdout.flush()
        