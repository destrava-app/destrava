'use client';
import { useEffect } from 'react';
import { registerSW } from '../src/register-sw';
export default function SWRegister(){ useEffect(()=>{registerSW();},[]); return null; }
