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
    driver.set_window_size(500, 600)
    for i in range(0, CHAPTERS):
        driver.get('http://localhost/github/the-physical-book/?chapter={}'.format(i))
        time.sleep(2)
        print("Snapping chapter {}".format(i))
        driver.get_screenshot_as_file('images/{}.png'.format(i))
