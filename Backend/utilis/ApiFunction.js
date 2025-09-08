class ApiFunction {
  constructor(query, queryStr) {
    this.query = query;      
    this.queryStr = queryStr; 
  }

 
  search() {
    let keyword = this.queryStr.keyword
      ? {
          $or: [
            { title: { $regex: this.queryStr.keyword, $options: "i" } },
            { department: { $regex: this.queryStr.keyword, $options: "i" } },
            { domain: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    let mainQuery = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit", "sort","stipendgte","stipendlte"];
    removeFields.forEach((key) => delete mainQuery[key]);

    
    
    let queryStr = JSON.stringify(mainQuery);
    queryStr = queryStr.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
    stipend() {
        let stipendQuery = {};
        if (this.queryStr.stipendgte && !this.queryStr.stipendlte) {
            stipendQuery = { stipend: { $gte: Number(this.queryStr.stipendgte) } };
        }
        if (this.queryStr.stipendlte && !this.queryStr.stipendgte) {
            stipendQuery = { stipend: { $lte: Number(this.queryStr.stipendlte) } };
        }
        if (this.queryStr.stipendgte && this.queryStr.stipendlte) {
            stipendQuery = {
            stipend: {
                $gte: Number(this.queryStr.stipendgte),
                $lte: Number(this.queryStr.stipendlte),
            },
            };
        }
        this.query = this.query.find(stipendQuery);
        return this;
    }


  sort() {
    if (this.queryStr.sort) {
      
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      
      this.query = this.query.sort({ createdAt: -1 });
    }
    return this;
  }
}

export { ApiFunction };
