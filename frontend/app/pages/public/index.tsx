import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Calendar as CalendarIcon,
  Search,
  ChevronDownIcon,
} from 'lucide-react';
import PropertyListing from '~/pages/public/PropertyListing';
import StatsSection from '~/pages/public/StatsSection';
import FacilitiesList from '~/pages/public/FacilitiesList';
import Testimonial from '~/pages/public/Testimonial';
import BlogSection from '~/pages/public/BlogSection';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';

const index = () => {
  return <div>Index</div>;
};

export default index;
