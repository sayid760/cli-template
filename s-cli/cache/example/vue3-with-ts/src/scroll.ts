import {ref, onMounted, onUnmounted} from 'vue' 

export default function useScroll(){
    const top = ref(0)
    function update(e:any){
        top.value = window.scrollY
        console.log('eee666678')
    }
    onMounted(()=>{
        window.addEventListener('scroll', update)
    })
    onUnmounted(()=>{
        window.removeEventListener('scroll', update)
    })
    return { top }
}

