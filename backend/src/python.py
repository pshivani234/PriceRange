import pymongo
import bs4
import urllib.request
import smtplib
import time
import ssl
from email.message import EmailMessage

# MongoDB connection
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['LoginSignupForm']
product_collection = db['productcollections']

print("Welcome")
prices_list = []

def check_price(urlpassed):
    url = urlpassed

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    req = urllib.request.Request(url, headers=headers)

    try:
        sauce = urllib.request.urlopen(req).read()
        soup = bs4.BeautifulSoup(sauce, "html.parser")
        prices = soup.find(class_="a-price-whole").get_text()
        prices = float(prices.replace(",", "").replace("₹", ""))
        prices_list.append(prices)
        return prices
    except urllib.error.HTTPError as e:
        print(f"HTTPError: {e.code} - {e.reason}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def send_email(message, receiver_email):
    email_sender = 'pingilishivanireddy234@gmail.com'
    email_password = 'hflo kmds koxg wakz'
    email_receiver = receiver_email
    subject = 'PriceRange: Your personal tracking hub'
    body = message

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())

def price_decrease_check(current_price, lowerprice, higherprice):
    return lowerprice < current_price < higherprice

count=1
while True:
    # Retrieve product ata from MongoDB
    try:
        products = product_collection.find()
        print("done")
        for product in products:
            print("product")
            urlpassed = product['url']
            lowerprice = product['lowprice']
            higherprice = product['highprice']
            receiver_email = product['email']
            productName = product['name']
            registration_email_sent = product['registration_email_sent']
            # Send initial registration email
            #if count == 1:
            if not registration_email_sent:
                msg = f"""Hello user,
    You have successfully registered {productName}
    {urlpassed} 
    to track the price.
    We will keep you updated."""
                send_email(msg, receiver_email)
                print("Registration mail sent")
                product_collection.update_one(
                    {'_id': product['_id']},
                    {'$set': {'registration_email_sent': True}}
                )

            current_price = check_price(urlpassed)
            print(current_price)
            product_collection.update_one(
                {'_id':product['_id']},
                {
                    '$set': {price}: current_price
                }
            )
            if count > 1:
                flag = price_decrease_check(current_price, lowerprice, higherprice)
                if flag:
                    decrease = prices_list[-1] - prices_list[-2]
                    message = f"The price has decreased. Please check the item. The price decreased by {decrease} rupees."
                    send_email(message, receiver_email)
                    print("Successfully sent price decrease email!")
            time.sleep(10)
        count += 1
    except Exception as e:
            print(f"Error: {e}")
            time.sleep(10) 