import selenium.webdriver as webdriver
from selenium.webdriver.support.ui import WebDriverWait
import contextlib
import time


@contextlib.contextmanager
def quitting(thing):
    yield thing
    thing.quit()

with quitting(webdriver.Firefox()) as driver:
    driver.get('http://localhost:3000')
    time.sleep(5)
    driver.get_screenshot_as_file('images/out.png')
