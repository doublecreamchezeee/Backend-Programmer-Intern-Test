import {
    CardBody, 
    CardImage,
} from './elements/CardDetail'

function checkProps(props){
    const default_props = {
        card_dim: {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5}
    }
    if (!props) props = {}
    for (const k in default_props){
        if (typeof props[k] === 'undefined') props[k] = default_props[k]
    }
    return props
}

export function Card(props){
    props = checkProps(props);

    return function ({d}) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", 'g'),
          gender_class = d.data.data.gender === 'M' ? 'card-male' :  'card-female',
          card_dim = props.card_dim,
          card_body = () => CardBody({d,card_dim, card_display: props.card_display}).template,
          card_image = () => CardImage({d, image: null, card_dim, maleIcon: null, femaleIcon: null}).template
        el.innerHTML = (`
          <g class="card ${gender_class}" data-id="${d.data.id}" data-cy="card">
            <g transform="translate(${-card_dim.w / 2}, ${-card_dim.h / 2})">
              <g clip-path="url(#card_clip)">
                ${card_body()}
                ${card_image()}
              </g>
            </g>
          </g>
        `)
        return el
    }
}

export default Card;