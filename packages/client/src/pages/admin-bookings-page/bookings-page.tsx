import './bookings-page.css';
import PageContentCommons from '../../Components/PageContentCommons.tsx';

export default function bookings() {
    return (
      <PageContentCommons active={0}>
          <div>
            <h4>To be approved</h4>
          </div>

          <div>
            <h4>Approved</h4>
          </div>

          <div>
            <h4>Done</h4>
          </div>

          
      </PageContentCommons>
    )
}