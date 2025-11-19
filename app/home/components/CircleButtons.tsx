// components
import Slider from '@components/Slider/Slider'
import ButtonCircle from '@components/Button/ButtonCircle'

const CircleButtons: React.FC = () => (
  <Slider>
    <ButtonCircle icon="theater_comedy" text="Theater" url="events" />
    <ButtonCircle icon="stadium" text="Concert" url="events" />
    <ButtonCircle icon="child_care" text="Kids" url="events" />
    <ButtonCircle icon="sports_football" text="Sports" url="events" />
    <ButtonCircle icon="attractions" text="Attractions" url="events" />
    <ButtonCircle icon="piano" text="Musical" url="events" />
    {/*<ButtonCircle icon='comedy_mask' text='Comedy' url='events' />*/}
    <ButtonCircle icon="festival" text="Festival" url="events" />
  </Slider>
)

export default CircleButtons
