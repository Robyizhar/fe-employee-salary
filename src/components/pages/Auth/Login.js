import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';

import { userLogin } from '../../../reduce/auth/actions';
import { rules } from './Validation';
import { login } from '../../../api/authAPI';

const statuslist = {
    idle: 'idle', 
    process: 'process', 
    success: 'success', 
    error: 'error',
}


const loginStyle = {
    "position": "absolute",
    "width": "100%",
    "marginLeft": "12%",
};

const Login = () => {

    const { register, handleSubmit, formState:{ errors } } = useForm();
    let dispatch = useDispatch();
    // let banners = useSelector( state => state.banners );
	let redirect = useNavigate();
    const [status, setStatus] = useState(statuslist.idle);

    const submitHandler = async ({email, password}) => {

        setStatus(statuslist.process);
        let { data } = await login(email, password); 

        // console.log(data);

        if(data.error){
            // setError('password', {type: 'invalidCredential', message: data.message});
            setStatus(statuslist.error);
        } else {
            // let {user, token} = data;
            setStatus(statuslist.success);
            dispatch(userLogin(data.data.user, data.data.accessToken));
            redirect(`/`);
        }

    }

    return (
        <div className="row" style={loginStyle}>
            {status === 'process' ? 
            <div className='col-md-12'>
                <ContentLoader
                    viewBox="0 0 400 160"
                    height={160}
                    width={1200}
                    backgroundColor="transparent"
                >
                    <circle cx="150" cy="86" r="8" />
                    <circle cx="194" cy="86" r="8" />
                    <circle cx="238" cy="86" r="8" />
                </ContentLoader>
            </div> : 
            <div className="col-md-6">
                <h2 className="text-center text-dark mt-5">Login Form</h2>
                <div className="card my-5">
                    <form onSubmit={handleSubmit(submitHandler)} className="card-body cardbody-color p-lg-5">
                        <div className="text-center">
                            {/* <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile" /> */}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" {...register('email', rules.email)} placeholder="Email" />
                            {errors.email && <p className='error-message' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" {...register('password', rules.password)} placeholder="password" />
                            {errors.password && <p className='error-message' role="alert">{errors.password?.message}</p>}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>}
            
        </div>
    )
}

export default Login