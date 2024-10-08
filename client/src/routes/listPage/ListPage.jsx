import React, {Suspense} from 'react'
import './listPage.scss'
import Filter from '../../components/filter/Filter'
import Card from '../../components/card/Card';
import Map from '../../components/map/Map.jsx';
import { Await, useLoaderData } from 'react-router-dom';

function ListPage() {
  const data = useLoaderData()

  return (
    <div className='listPage'>
      <div className="listContainer">
        <div className="wrapper">
          <Filter/>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {
                (postResponse) => postResponse.data.data.map(post => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
      <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {
                (postResponse) =>  <Map items={postResponse.data.data}/>
              }
            </Await>
          </Suspense>
        
      </div>
    </div>
  )
}
 
export default ListPage



// {posts.data.map(item => (
//   <Card key={item.id} item={item}/>
// ))}