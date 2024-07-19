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
    subject = 'Price Watch: Your personal tracking hub'
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

def price_decrease_check(current_price, higherprice):
    return current_price < higherprice

count=1
while True:
    # Retrieve product ata from MongoDB
    try:
        products = product_collection.find()
        print("done")
        for product in products:
            print("product")
            urlpassed = product['url']
            higherprice = product['highprice']
            receiver_email = product['email']
            productName = product['name']
            registration_email_sent = product['registration_email_sent']
            # Send initial registration email
            if not registration_email_sent:
                msg = f"""Dear User,

Thank you for registering {productName} on Price Watch to track its price. You can find the product link here: {urlpassed}. Our system will diligently monitor the price fluctuations and notify you promptly via email as soon as the product price falls within your specified Limit.

Thank you once again for choosing Price Watch for your price tracking needs.

Best regards,

Price Watch Team."""
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
                    '$set': {'price': current_price}
                }
            )
            if count > 1:
                flag = price_decrease_check(current_price, higherprice)
                if flag:
                    decrease = prices_list[-1] - prices_list[-2]
                    message = f"""Dear User,

We are pleased to inform you that the price of the product {productName} with url: {urlpassed} has fallen into under desired limit. We recommend you check the item at your earliest convenience.

The price has decreased by {decrease} from the previous price.

Thank you for using Price Watch to monitor your product prices.

Best regards,

The Price Watch Team"""
                    send_email(message, receiver_email)
                    print("Successfully sent price range email!")
            time.sleep(10)
        count += 1
    except Exception as e:
            print(f"Error: {e}")
            time.sleep(10) 