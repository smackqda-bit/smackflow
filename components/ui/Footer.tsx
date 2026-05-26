
export default function Footer() {
    return(
        <div className="lg:mx-10 mx-5 my-5">
            
            <div className="flex-col sm:flex sm:justify-between items-center mt-10">
                 <a  href="#header">
                    <span className="text-xs text-muted-foreground hover:text-white transition-colors cursor-pointer">
                        © 2026 SmackFlow | All rights reserved
                    </span>
                 </a>
                <div className="space-x-5">
                <a href='https://smackq.space/' target="_blank" rel="noopener noreferrer">
                    <span className="text-xs text-muted-foreground hover:text-white transition-colors cursor-pointer">
                        Author: smackq.space
                    </span>
                </a>
                <a href='mailto:smackq.da@gmail.com' target="_blank" rel="noopener noreferrer">
                    <span className="text-xs text-muted-foreground hover:text-white transition-colors cursor-pointer">
                        Email: smackq.da@gmail.com
                    </span>
                </a>
                </div>
            </div>
        </div>
    )
}