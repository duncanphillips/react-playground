class PretendDB {
  constructor(props) {
    this.x_list = [
      { id: 0, x: 5 },
      { id: 1, x: 5 },
    ];
  }

  update_x(x_id, x, callback) {
    let exists = false;
    for (let idx in this.x_list) {
      let cur = this.x_list[idx];
      if (cur['id'] === x_id) {
        cur['x'] = x;
        exists = true;
      }
    }
    if (!exists) {
      this.x_list.push({ id: x_id, x: x});
    }
    callback();
  }

  search_range(x_min, x_max, callback) {
    let results = [];
    for (let idx in this.x_list) {
      let cur = this.x_list[idx];
      if ((cur['x'] >= x_min) && (cur['x'] < x_max)) {
        results.push(cur);
      }
    }
    callback(results);
  }
}

const db = new PretendDB();

class MyAPI{
  constructor(props) { this.update_callback = null; }

  on_update(fn) { this.update_callback = fn; }

  update_x(x_id, x) {
    db.update_x(x_id, x, this.update_callback)
  }

  search_range(min_x, max_x, callback) {
    db.search_range(min_x, max_x, callback)
  }
}

const api = new MyAPI();

export default api;
