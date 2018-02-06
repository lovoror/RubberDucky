import { Graphics } from 'pixi.js'
import App from './App'
import { PTM } from './Constants'

export default class RubberDucky extends Graphics {
  constructor(x, y) {
    super()
    this.position.set(x, y)
    this.createBody(x / PTM, y / PTM)
    this.draw()

    App.ticker.add(() => {
      let pos = this.body.GetPosition()
      this.position.set(pos.get_x() * PTM, pos.get_y() * PTM)
      this.rotation = this.body.GetAngle()
    })
  }

  createBody(x, y) {
    const bd = new Box2D.b2BodyDef()
    bd.set_type(2)
    bd.set_position(new Box2D.b2Vec2(x,y))
    const duck = App.world.CreateBody(bd)

    const head = new Box2D.b2CircleShape()
    head.set_m_p(new Box2D.b2Vec2(0.065, -0.065))
    head.set_m_radius(0.09)
    duck.CreateFixture(head, 0.01)

    const frontBody = new Box2D.b2CircleShape()
    frontBody.set_m_p(new Box2D.b2Vec2(0.03, 0.065))
    frontBody.set_m_radius(0.1)
    duck.CreateFixture(frontBody, 0.4)

    const backBody = new Box2D.b2CircleShape()
    backBody.set_m_p(new Box2D.b2Vec2(-0.07, 0.065))
    backBody.set_m_radius(0.1)
    duck.CreateFixture(backBody, 0.4)

    this.body = duck
  }

  draw() {
    this.beginFill(0xffffff)
    // duckhead
    this.drawCircle(0.065 * PTM, -0.065 * PTM, 0.09 * PTM)
    // duckbody
    this.drawEllipse(-0.02 * PTM, 0.065 * PTM, 0.1725 * PTM, 0.115 * PTM)
    // ducktail
    this.drawEllipse(-0.165 * PTM, 0.0225 * PTM, 0.035 * PTM, 0.08 * PTM)

    const duckupperlip = new Graphics()
    duckupperlip.beginFill(0xffffff)
    duckupperlip.drawEllipse(0, 0, 0.035 * PTM, 0.02 * PTM)
    duckupperlip.rotation = - Math.PI / 9
    duckupperlip.position.set(0.165 * PTM, -0.08 * PTM)
    this.addChild(duckupperlip)

    const ducklowerlip = new Graphics()
    ducklowerlip.beginFill(0xffffff)
    ducklowerlip.drawEllipse(0, 0, 0.035 * PTM, 0.02 * PTM)
    ducklowerlip.rotation = + Math.PI / 9
    ducklowerlip.position.set(0.165 * PTM, -0.05 * PTM)
    this.addChild(ducklowerlip)
  }
}
