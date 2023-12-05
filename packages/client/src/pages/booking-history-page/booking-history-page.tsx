import Navbar from '../home-page/navbar.tsx';
import Footer from '../../Components/Footer.tsx';
import './booking-history-page.scss'

export default function History() {
    return (
      <>
          <Navbar/>
          <section className='header'>
              <h1>BOOKING HISTORY</h1>
          </section>

          <section>
            <div>
              <select className="Filter-Options">
                <option>Approve</option>
                <option>Rejected</option>
               </select>
            </div>
            <div>
            <input placeholder="Search"></input>
            </div>
          </section>

        <section className='table-container'>
          <table className='table-main'>
            <thead>
                <tr>
                  <th>Service</th>
                  <th>Adds On</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
            </thead>
              <tbody>
                <tr>
                  <td>General Cleaning</td>
                  <td>Mattress and Deep Cleaning </td>
                  <td>9:00 AM  </td>
                  <td>October 18, 2023</td>
                  <td>$2,000.00</td>
                 </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Deep Cleaning</td>
                  <td>Mattress and Deep Cleaning</td>
                  <td>9:00 AM</td>
                  <td>October 31, 2023</td>
                  <td>$3,999.00</td>
                 </tr>
              </tbody>
          </table>
          </section>
          <Footer/>
          </>
    )
}