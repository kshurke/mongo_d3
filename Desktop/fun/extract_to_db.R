# libraries
library(mongolite)
library(RSocrata)

# mLab info
mlab = list(
  "host" = "ds155841.mlab.com:55841",
  "username" = "jb",
  "password" = "jb"
)
db <- "cms"
collection <- "gen_info"
url = sprintf(
  "mongodb://%s:%s@%s/%s",
  mlab$username, mlab$password, mlab$host, db)

# data to insert
gen_info_raw = read.socrata("https://data.medicare.gov/resource/rbry-mqwu.csv")

con = mongo(collection = "gen_info", url = url)
con$insert(gen_info_raw)