export function CardBody({ d, card_dim, card_display }) {
  return {
    template: (`
      <g class="card-body">
        <rect width="${card_dim.w}" height="${card_dim.h}" class="card-body-rect" />
        <g transform="translate(${card_dim.text_x}, ${card_dim.text_y})">
          <text clip-path="url(#card_text_clip)">
            <tspan x="${0}" dy="${14}">${card_display[0](d.data)}</tspan>
          </text>
  <!--        <rect width="${card_dim.w - card_dim.text_x - 10}" height="${card_dim.h - 20}" style="mask: url(#fade)" class="text-overflow-mask" /> -->
        </g>
      </g>
    `)
  }
}

export function CardImage({ d, image, card_dim, maleIcon, femaleIcon }) {
  return ({
    template: (`
    <g style="transform: translate(${card_dim.img_x}px,${card_dim.img_y}px);" class="card_image" clip-path="url(#card_image_clip)">
        <image href="/${d.data.data.gender}.jpg" height="${card_dim.img_h}" width="${card_dim.img_w}" preserveAspectRatio="xMidYMin slice" referrerpolicy="no-referrer" />
      </g>
  `)
  })
}
