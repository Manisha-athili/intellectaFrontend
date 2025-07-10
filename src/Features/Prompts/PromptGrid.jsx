
import { Fragment } from 'react';
import PromptCard from '../../Components/PromptCard';


export default function PromptGrid({prompts}){
    // console.log(prompts)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-6 px-6 py-8 max-w-7xl mx-auto" '>
            {/* {console.log(prompts._id)} */}
            {
                prompts.map((prompt,idx)=>(
                    <Fragment key={idx}>
                    {/* {console.log(prompt._id)} */}
                    <PromptCard 
                    id = {prompt._id}
                    title={prompt.title}
                    description={prompt.description || 0}
                    categories= {prompt.categories || []}
                    copiedCount={prompt.copiedCount || 0}
                    forkCount={ prompt.forkCount || 0} 
                    stars={prompt.stars || [1,23]}
                    createdAt ={prompt.createdAt ||0}
                    username={prompt.username || "User@1984"}
                    author={""}
                    />
                    </Fragment>
                ))
            }
        </div>
    )
}