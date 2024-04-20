export function sortChildrenWithSpouses(data) {
    data.forEach(datum => {
      if (!datum.rels.children) return
      datum.rels.children.sort((a, b) => {
        const a_d = data.find(d => d.id === a),
          b_d = data.find(d => d.id === b),
          a_p2 = otherParent(a_d, datum, data) || {},
          b_p2 = otherParent(b_d, datum, data) || {},
          a_i = datum.rels.spouses.indexOf(a_p2.id),
          b_i = datum.rels.spouses.indexOf(b_p2.id)
  
        if (datum.data.gender === "M") return a_i - b_i
        else return b_i - a_i
      })
    })
  }
  
  function otherParent(d, p1, data) {
    return data.find(d0 => (d0.id !== p1.id) && ((d0.id === d.rels.mother) || (d0.id === d.rels.father)))
  }
  
  
  