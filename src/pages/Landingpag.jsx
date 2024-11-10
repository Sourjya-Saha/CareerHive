import { Button } from '@/components/ui/button';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Carousel,
    CarouselContent,
    CarouselItem,

  } from "@/components/ui/carousel"
  import companies from '../data/companies.json'
import Autoplay from 'embla-carousel-autoplay';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import faqs from "../data/faq.json";
const LandingPage =()=> {
    return ( 
    <main className='flex flex-col gap-10 sm:gap-20 py-[20px] sm:py-[20px]'>
        <section className='text-center'>
            <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Hive of Oppertunites{" "}<span className='flex items-center gap-2 py-2 '>Join{" "}Career<span className='text-red-500'>Hive</span></span></h1>
            <p className='text-gray-300 sm:mt-4 text-[16px] sm:text-[28px] font-semibold'>
                Explore thousands of job listings or find the perfect candidate
            </p>
        </section>
        <div className='flex sm:gap-6 gap-2 justify-center '>
            <Link to='/jobs'>
            <Button variant="blue" size="xl">Find Jobs</Button>
            </Link>
            <Link to='/post-job'>
            <Button size="xl" variant="destructive">Post Jobs</Button>
            </Link> 
        </div>
        <div>
        <Carousel
        plugins={[Autoplay({delay:1500})]}
    
      className="w-full py-10 sm:px-[150px] px-[50px]"
    >
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {companies.map(({name,id,path})=>{
            return<CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img src={path} alt={name} className='h-9 sm:h-14 object-contain'/>
            </CarouselItem>

        })}
      </CarouselContent>
    
    </Carousel>
    </div>
    <img src="/banner.jpg" className='w-full pt-10 sm:px-[150px]  px-[50px]'/>
    <section className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:px-[150px]  px-[50px]'>
    <Card>
  <CardHeader>
    <CardTitle className="font-bold text-3xl">For Job Seekers</CardTitle>

  </CardHeader>
  <CardContent className="text-[15px]">
Search and appply for jobs, track applications and more.
  </CardContent>

</Card>
<Card>
  <CardHeader>
    <CardTitle className="font-bold text-3xl">For Employers</CardTitle>

  </CardHeader>
  <CardContent className="text-[15px]">
   Post jobs , manage applications , and find best candidates.
  </CardContent>

</Card>

    </section>
    <Accordion type="multiple" className="w-full sm:px-[150px]  px-[30px]">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="font-bold text-[20px]">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-[15px]"> {faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
     
    </main>
     );
}

export default LandingPage ;