import selenium.webdriver as webdriver
from selenium.webdriver.support.ui import WebDriverWait
import contextlib
import time

CHAPTERS = 590


@contextlib.contextmanager
def quitting(thing):
    yield thing
    thing.quit()


with quitting(webdriver.Firefox()) as driver:
    for i in range(0, CHAPTERS):
        print("Snapping chapter {}".format(i))
        driver.get('http://localhost:3000/?chapter={}'.format(i))
        time.sleep(5)
        driver.get_screenshot_as_file('images/{}.png'.format(i))
