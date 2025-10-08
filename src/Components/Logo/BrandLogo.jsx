
import Logo3 from '../../assets/logo-3.png'
const BrandLogo = () => {
    return (
        <div>
                <div className='relative'>
                    <img src={Logo3} alt="" className='sm:w-50 w-30 h-16 object-cover sm:ml-[44px] ml-[30px]' />
                    <p className={`absolute sm:top-[10px] max-sm:top-[17px] left-0 font-extrabold sm:text-3xl`}>Ren<span className='sm:text-4xl'>t</span></p>
                </div>


        </div>
    )
}

export default BrandLogo