import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MarketingPage() {
  return (
<>
<section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pd-12">
    <div className="container text-center flex flex-col items-center gap-4 max-w-[64rem]">
        <Link href={siteConfig.links.x} className="bg-muted px-4 py-1.5 rounded-2xl font-medium text-sm">
            xをフォローする
        </Link>
        <h1 className="text-3xl font-extrabnold sm:text-5xl md:text-6xl lg:text-7xl">post writer</h1>
        <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">練習中ですね、このアプリケーションはnextjsやapprouterなどを使って開発されて位使って開発されていいます。勉強中です</p>
    
    <div className='space-x-4'>
    <Link href={'/login'} className={cn(buttonVariants({size:'lg'}))}>
    はじめる
    </Link>
    <Link href={siteConfig.links.github} className={cn(buttonVariants({size:'lg',variant:'outline'}))} target='_blank' rel='noreferrer'>
    github
    </Link>
    </div>
    </div>
</section>

<section id='features' className="container py-8 md:py-12 lg:py-24 bg-slate-50 space-y-6">
  <div className="text-center space-y-6 max-w-[58rem] mx-auto">
    <h2 className="font-extrabold text-3xl md:text-6xl">
      サービスの特徴
    </h2>
    <p className="text-muted-foreground sm:text-lg sm:leading-7">このプロジェクトは練習中のプロダクトです。難しいですね</p>
  </div>

  <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[64rem]">
    <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
      <div className="flex flex-col justify-between p-6 md:h-[160px] h-[180px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 128 128">
    <path d="M30.2 45.9h24.1v1.9H32.4v14.4H53v1.9H32.4v15.8h22.2v1.9H30.2V45.9zm26.3 0h2.6l11.4 15.8L82 45.9l15.8-20l-26 37.5l13.4 18.4h-2.7L70.4 65L58.2 81.8h-2.6l13.5-18.4l-12.6-17.5zm29.7 1.9v-1.9h27.5v1.9H101v34h-2.2v-34H86.2zM0 45.9h2.7l38.2 56.8l-15.8-20.9L2.3 48.6l-.1 33.2H0zm113.5 33.4c.5 0 .8-.3.8-.8s-.3-.8-.8-.8s-.8.3-.8.8s.4.8.8.8zm2.2-2.1c0 1.3 1 2.2 2.4 2.2c1.5 0 2.4-.9 2.4-2.5v-5.5h-1.2v5.5c0 .9-.4 1.3-1.2 1.3c-.7 0-1.2-.4-1.2-1.1h-1.2zm6.3-.1c.1 1.4 1.2 2.3 3 2.3s3-.9 3-2.4c0-1.2-.7-1.8-2.2-2.2l-.9-.2c-1-.2-1.4-.6-1.4-1.1c0-.7.6-1.2 1.6-1.2c.9 0 1.5.4 1.6 1.2h1.2c-.1-1.3-1.2-2.2-2.8-2.2c-1.7 0-2.8.9-2.8 2.3c0 1.1.6 1.8 2 2.1l1 .2c1 .2 1.5.6 1.5 1.2c0 .7-.7 1.2-1.7 1.2s-1.8-.5-1.9-1.2H122z"/>
</svg>
<div className='space-y-2'>
  <h3 className='text-sm text-muted-foreground'>
    Next.js
  </h3>
  <p>Approutersなどを利用</p>
</div>
      </div>
    </div>
    <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
      <div className="flex flex-col justify-between p-6  h-[180px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 128 128">
    <path d="M30.2 45.9h24.1v1.9H32.4v14.4H53v1.9H32.4v15.8h22.2v1.9H30.2V45.9zm26.3 0h2.6l11.4 15.8L82 45.9l15.8-20l-26 37.5l13.4 18.4h-2.7L70.4 65L58.2 81.8h-2.6l13.5-18.4l-12.6-17.5zm29.7 1.9v-1.9h27.5v1.9H101v34h-2.2v-34H86.2zM0 45.9h2.7l38.2 56.8l-15.8-20.9L2.3 48.6l-.1 33.2H0zm113.5 33.4c.5 0 .8-.3.8-.8s-.3-.8-.8-.8s-.8.3-.8.8s.4.8.8.8zm2.2-2.1c0 1.3 1 2.2 2.4 2.2c1.5 0 2.4-.9 2.4-2.5v-5.5h-1.2v5.5c0 .9-.4 1.3-1.2 1.3c-.7 0-1.2-.4-1.2-1.1h-1.2zm6.3-.1c.1 1.4 1.2 2.3 3 2.3s3-.9 3-2.4c0-1.2-.7-1.8-2.2-2.2l-.9-.2c-1-.2-1.4-.6-1.4-1.1c0-.7.6-1.2 1.6-1.2c.9 0 1.5.4 1.6 1.2h1.2c-.1-1.3-1.2-2.2-2.8-2.2c-1.7 0-2.8.9-2.8 2.3c0 1.1.6 1.8 2 2.1l1 .2c1 .2 1.5.6 1.5 1.2c0 .7-.7 1.2-1.7 1.2s-1.8-.5-1.9-1.2H122z"/>
</svg>
<div className='space-y-2'>
  <h3 className='text-sm text-muted-foreground'>
    Next.js
  </h3>
  <p>Approutersなどを利用</p>
</div>
      </div>
    </div>
    <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
      <div className="flex flex-col justify-between p-6 ] h-[180px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 128 128">
    <path d="M30.2 45.9h24.1v1.9H32.4v14.4H53v1.9H32.4v15.8h22.2v1.9H30.2V45.9zm26.3 0h2.6l11.4 15.8L82 45.9l15.8-20l-26 37.5l13.4 18.4h-2.7L70.4 65L58.2 81.8h-2.6l13.5-18.4l-12.6-17.5zm29.7 1.9v-1.9h27.5v1.9H101v34h-2.2v-34H86.2zM0 45.9h2.7l38.2 56.8l-15.8-20.9L2.3 48.6l-.1 33.2H0zm113.5 33.4c.5 0 .8-.3.8-.8s-.3-.8-.8-.8s-.8.3-.8.8s.4.8.8.8zm2.2-2.1c0 1.3 1 2.2 2.4 2.2c1.5 0 2.4-.9 2.4-2.5v-5.5h-1.2v5.5c0 .9-.4 1.3-1.2 1.3c-.7 0-1.2-.4-1.2-1.1h-1.2zm6.3-.1c.1 1.4 1.2 2.3 3 2.3s3-.9 3-2.4c0-1.2-.7-1.8-2.2-2.2l-.9-.2c-1-.2-1.4-.6-1.4-1.1c0-.7.6-1.2 1.6-1.2c.9 0 1.5.4 1.6 1.2h1.2c-.1-1.3-1.2-2.2-2.8-2.2c-1.7 0-2.8.9-2.8 2.3c0 1.1.6 1.8 2 2.1l1 .2c1 .2 1.5.6 1.5 1.2c0 .7-.7 1.2-1.7 1.2s-1.8-.5-1.9-1.2H122z"/>
</svg>
<div className='space-y-2'>
  <h3 className='text-sm text-muted-foreground'>
    Next.js
  </h3>
  <p>Approutersなどを利用</p>
</div>
      </div>
    </div>
    <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
      <div className="flex flex-col justify-between p-6  h-[180px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 128 128">
    <path d="M30.2 45.9h24.1v1.9H32.4v14.4H53v1.9H32.4v15.8h22.2v1.9H30.2V45.9zm26.3 0h2.6l11.4 15.8L82 45.9l15.8-20l-26 37.5l13.4 18.4h-2.7L70.4 65L58.2 81.8h-2.6l13.5-18.4l-12.6-17.5zm29.7 1.9v-1.9h27.5v1.9H101v34h-2.2v-34H86.2zM0 45.9h2.7l38.2 56.8l-15.8-20.9L2.3 48.6l-.1 33.2H0zm113.5 33.4c.5 0 .8-.3.8-.8s-.3-.8-.8-.8s-.8.3-.8.8s.4.8.8.8zm2.2-2.1c0 1.3 1 2.2 2.4 2.2c1.5 0 2.4-.9 2.4-2.5v-5.5h-1.2v5.5c0 .9-.4 1.3-1.2 1.3c-.7 0-1.2-.4-1.2-1.1h-1.2zm6.3-.1c.1 1.4 1.2 2.3 3 2.3s3-.9 3-2.4c0-1.2-.7-1.8-2.2-2.2l-.9-.2c-1-.2-1.4-.6-1.4-1.1c0-.7.6-1.2 1.6-1.2c.9 0 1.5.4 1.6 1.2h1.2c-.1-1.3-1.2-2.2-2.8-2.2c-1.7 0-2.8.9-2.8 2.3c0 1.1.6 1.8 2 2.1l1 .2c1 .2 1.5.6 1.5 1.2c0 .7-.7 1.2-1.7 1.2s-1.8-.5-1.9-1.2H122z"/>
</svg>
<div className='space-y-2'>
  <h3 className='text-sm text-muted-foreground'>
    Next.js
  </h3>
  <p>Approutersなどを利用</p>
</div>
      </div>
    </div>
    <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
      <div className="flex flex-col justify-between p-6  h-[180px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 128 128">
    <path d="M30.2 45.9h24.1v1.9H32.4v14.4H53v1.9H32.4v15.8h22.2v1.9H30.2V45.9zm26.3 0h2.6l11.4 15.8L82 45.9l15.8-20l-26 37.5l13.4 18.4h-2.7L70.4 65L58.2 81.8h-2.6l13.5-18.4l-12.6-17.5zm29.7 1.9v-1.9h27.5v1.9H101v34h-2.2v-34H86.2zM0 45.9h2.7l38.2 56.8l-15.8-20.9L2.3 48.6l-.1 33.2H0zm113.5 33.4c.5 0 .8-.3.8-.8s-.3-.8-.8-.8s-.8.3-.8.8s.4.8.8.8zm2.2-2.1c0 1.3 1 2.2 2.4 2.2c1.5 0 2.4-.9 2.4-2.5v-5.5h-1.2v5.5c0 .9-.4 1.3-1.2 1.3c-.7 0-1.2-.4-1.2-1.1h-1.2zm6.3-.1c.1 1.4 1.2 2.3 3 2.3s3-.9 3-2.4c0-1.2-.7-1.8-2.2-2.2l-.9-.2c-1-.2-1.4-.6-1.4-1.1c0-.7.6-1.2 1.6-1.2c.9 0 1.5.4 1.6 1.2h1.2c-.1-1.3-1.2-2.2-2.8-2.2c-1.7 0-2.8.9-2.8 2.3c0 1.1.6 1.8 2 2.1l1 .2c1 .2 1.5.6 1.5 1.2c0 .7-.7 1.2-1.7 1.2s-1.8-.5-1.9-1.2H122z"/>
</svg>
<div className='space-y-2'>
  <h3 className='text-sm text-muted-foreground'>
    Next.js
  </h3>
  <p>Approutersなどを利用</p>
</div>
      </div>
    </div>
    <div className="bg-background border p-2 rounded-lg flex items-center gap-2">
      <div className="flex flex-col justify-between p-6  h-[180px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 128 128">
    <path d="M30.2 45.9h24.1v1.9H32.4v14.4H53v1.9H32.4v15.8h22.2v1.9H30.2V45.9zm26.3 0h2.6l11.4 15.8L82 45.9l15.8-20l-26 37.5l13.4 18.4h-2.7L70.4 65L58.2 81.8h-2.6l13.5-18.4l-12.6-17.5zm29.7 1.9v-1.9h27.5v1.9H101v34h-2.2v-34H86.2zM0 45.9h2.7l38.2 56.8l-15.8-20.9L2.3 48.6l-.1 33.2H0zm113.5 33.4c.5 0 .8-.3.8-.8s-.3-.8-.8-.8s-.8.3-.8.8s.4.8.8.8zm2.2-2.1c0 1.3 1 2.2 2.4 2.2c1.5 0 2.4-.9 2.4-2.5v-5.5h-1.2v5.5c0 .9-.4 1.3-1.2 1.3c-.7 0-1.2-.4-1.2-1.1h-1.2zm6.3-.1c.1 1.4 1.2 2.3 3 2.3s3-.9 3-2.4c0-1.2-.7-1.8-2.2-2.2l-.9-.2c-1-.2-1.4-.6-1.4-1.1c0-.7.6-1.2 1.6-1.2c.9 0 1.5.4 1.6 1.2h1.2c-.1-1.3-1.2-2.2-2.8-2.2c-1.7 0-2.8.9-2.8 2.3c0 1.1.6 1.8 2 2.1l1 .2c1 .2 1.5.6 1.5 1.2c0 .7-.7 1.2-1.7 1.2s-1.8-.5-1.9-1.2H122z"/>
</svg>
<div className='space-y-2'>
  <h3 className='text-sm text-muted-foreground'>
    Next.js
  </h3>
  <p>Approutersなどを利用</p>
</div>
      </div>
    </div>

  </div>
  <div className="mx-auto md:max-w-[58rem] text-center">
      <p className="text-muted-foreground sm:text-lg sm:leading-7">post writerはログインするとブログ投稿ができるようになります</p>
    </div>
</section>

<section id='contact' className="container py-8 md:py-12 lg:py-24">
  <div className="max-w-[58rem] mx-auto text-center space-y-2">
    <h2 className="font-extrabold text-3xl md:text-6xl">
    contact me
    </h2>
    <p className="text-muted-foreground sm:text-lg sm:leading-7">
      もし気に入った場合は下記xからDmしてください<br />
      お仕事のご連絡お待ちしております
    </p>
    <Link 
    href={siteConfig.links.x}
    className="underline underline-offset-4"
    target='_blank'
    rel='noreferrer'>
    お仕事はXまで
    </Link>
  </div>
</section>
</>
  )
}

