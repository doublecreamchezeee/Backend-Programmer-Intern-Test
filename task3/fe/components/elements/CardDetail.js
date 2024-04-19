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
  