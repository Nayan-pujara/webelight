class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exclude = ['page', 'sort', 'limit'];
    exclude.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query.sort(this.queryString.sort);
    }
    return this;
  }

  pagination() {
    if (this.queryString.page && this.queryString.limit) {
      const page = +this.queryString.page;
      const limit = +this.queryString.limit;
      const skip = (page - 1) * limit;

      this.query.skip(skip).limit(limit);
    }
    return this;
  }
}

module.exports = APIFeature;
