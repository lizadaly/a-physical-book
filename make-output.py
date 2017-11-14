MAX_CHAPTERS = 500


print """
<html>
<head></head>
<style>
@font-face {
    font-family: serif;
    font-style: normal;
    font-weight: normal;
    src: url("/Library/Fonts/Baskerville.ttc")
}
@page {
  size: 8in 5in;
  margin: .5in 0 0 0;
}
.left {
    float: left;
    width: 3.5in;
    margin-left: .4in;
    border-right: 1px solid rgb(220,220,220);

}
.right {
    float: right;
    width: 3.5in;
    margin-right: .4in;
}
div {
    clear: both;
    width: 8in;
    margin: auto;
    page-break-before: always;
    font-style: roman;
    text-align: center;
}
</style>
<body>
<div>
Page one
</div>
<div>
<br/>
<br/>
<br/>
<br/>
<h1>A Physical Book</h1>

<h2>By Liza Daly (@liza) for NaNoGenMo 2017</h2>
<p>
Based on 400 Ways to Make a Sandwich (1909) by  Eva Green Fuller
</p>

</div>

"""

for i in range(0, MAX_CHAPTERS):
    cls = "left" if i % 2 == 0 else "right"
    if cls == "left":
        print "<div>"

    print """<img class="{}" src="images/{}.png">""".format(cls, i)
    if cls == "right":
        print "</div>"

print """
</body>
</html>
"""
