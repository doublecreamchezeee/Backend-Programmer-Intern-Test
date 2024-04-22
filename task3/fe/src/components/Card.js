import {
    CardBody, 
    CardImage,
    CardBirthday
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
    const store = props.store;
    console.log('stote', store)
    return function ({d}) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", 'g'),
          gender_class = d.data.data.gender === 'M' ? 'card-male' :  'card-female',
          card_dim = props.card_dim,
          card_body = () => CardBody({d,card_dim, card_display: props.card_display}).template,
          card_image = () => CardImage({d, image: null, card_dim, maleIcon: null, femaleIcon: null}).template,
          card_dayofbirth = () => CardBirthday({d, card_dim, card_display: props.card_display}).template
          el.innerHTML = (`
          <g class="card ${gender_class}" data-id="${d.data.id}" data-cy="card">
            <g transform="translate(${-card_dim.w / 2}, ${-card_dim.h / 2})">
              <g clip-path="url(#card_clip)">
                ${store.state.displayType === 0 ? card_body() : ''}
                ${store.state.displayType === 0 ? card_image() : ''}
                ${store.state.displayType === 1 ? card_dayofbirth() : ''}
              </g>
            </g>
          </g>
        `)
        return el
    }
}

export default Card;