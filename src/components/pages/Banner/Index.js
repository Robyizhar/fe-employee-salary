import React, {Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, setPage, goToNextPage, goToPrevPage, setKeyword, setLimit } from '../../../reduce/banner/actions';
import { config } from '../../../config';
import { deleteData } from '../../../api/bannerAPI';
import Swal from 'sweetalert2'

// COMPONENT
import Breadcumb from '../../atom/Breadcumb';
import Pagination from '../../atom/Pagination';
import Filter from '../../atom/Filter';
import ContentLoaderRow from '../../atom/ContentLoaderRow'
import Image from '../../atom/Image';
import Button from '../../atom/Button';
import AlertForm from '../../atom/AlertForm';

const Index = () => {

    // let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    let dispatch = useDispatch();
    let banners = useSelector( state => state.banners );
    let user = useSelector( state => state.auth );
    let redirect = useNavigate();
    React.useEffect(() => {
		dispatch(fetchData());
	}, [dispatch, banners.currentPage, banners.keyword, banners.perPage]);

    const deleteHandler = (id) => {
        let token = user.token || '';

        Swal.fire({
            title: 'Delete This Item ?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                let result = deleteData(id, token);
                result.then(function(data) {
                    if (data.data.error === 1) {
                        Swal.fire(data.data.message, '', 'error')
                    } else {
                        Swal.fire('Deleted !', '', 'success')
                        dispatch(fetchData());
                    }
                })
            }
        })
    }

    const editHandler = (id) => {
        redirect(`/banner/form/${id}`);
    }
    const detailHandler = (data) => {
        console.log(data);
    }

    return (
        <Fragment>
            <div className='row'>
                <Breadcumb url={'/banner'}></Breadcumb>
                <Filter 
                    perPage={ limit => dispatch(setLimit(limit))} 
                    keyWord={ key => dispatch(setKeyword(key))}
                    limit={banners.perPage}>
                </Filter>
                <div className='col-6 col-sm-6 col-md-6 my-3'>
                    <Link to="/banner/form" className="btn btn-primary float-right" style={{float: 'right'}}>Add</Link>
                </div>
                <div className='col-12 col-sm-12 col-md-12 my-3'>
                    {banners.status === 'success' && <AlertForm property={`success`} text={banners.message}></AlertForm>} 
                    {banners.status === 'error' && <AlertForm property={`danger`} text={'Gagal Menampilkan Data'}></AlertForm>} 
                    <div className="card" >
                        <div className="card-body">
                            <table className="table table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Judul</th>
                                        <th scope="col">Link</th>
                                        <th scope="col">Gambar</th>
                                        <th width="14%" scope="col">Actions</th>
                                    </tr>
                                </thead>
                                {<tbody>
                                    { banners.status === 'success' && banners.data && banners.data.map((banner, index) => 
                                        <tr key={banner._id} className='p-3'>
                                            <td className='p-3'>{index+1}</td>
                                            <td className='p-3'>{banner.title}</td>
                                            <td className='p-3'>{banner.link}</td>
                                            <td className='p-3'>
                                                {banner.image_url && <Image url={`${config.api_host}/${banner.image_url}`} width={'25%'}></Image>}
                                            </td>
                                            <td className='p-3'>
                                                <Button onAction={() => editHandler(banner._id)} text={`Edit`} icon={`bi bi-pencil-square`} property={`btn btn-light`}></Button>
                                                <Button onAction={() => detailHandler(banner._id)} text={`Detail`} icon={`bi bi-info-circle`} property={`btn btn-light mx-2`}></Button>
                                                <Button onAction={() => deleteHandler(banner._id)} text={`Delete`} icon={`bi bi-trash-fill`} property={`btn btn-light`}></Button>
                                            </td>
                                        </tr>
                                    )}
                                    {banners.status === 'process' && <tr>
                                        <th colSpan="5">
                                            <ContentLoaderRow row={5}></ContentLoaderRow>
                                        </th>
                                    </tr>}
                                </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination 
                    currentPage={banners.currentPage} 
                    perPage={banners.perPage} 
                    totalItems={banners.totalItems} 
                    paginate={ number => dispatch(setPage(number))} 
                    goToPrevPage={ () => dispatch(goToPrevPage())} 
                    goToNextPage={ () => dispatch(goToNextPage())}>
                </Pagination>
            </div>
        </Fragment>
    )
}
export default Index