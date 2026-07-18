import {ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  team = [
    {
      name: "Fatima Bajouk",
      role: "Co-Founder & CEO",
      img: "photo-1494790108377-be9c29b29330"
    },
    {
      name: "Mohammad Bajouk",
      role: "Co-Founder & Creative Director",
      img: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Zeinab Rida",
      role: "Head of Merchandising",
      img: "photo-1438761681033-6461ffad8d80"
    },
    {
      name: "Ali Rida",
      role: "Head of Technology",
      img: "photo-1500648767791-00dcc994a43e"
    }
  ];


  values = [
    {
      label: "Quality First",
      desc: "Every product vetted for quality."
    },
    {
      label: "Curated Style",
      desc: "Hand-picked, trend-aligned collections."
    },
    {
      label: "Customer Care",
      desc: "Dedicated support, hassle-free returns."
    },
    {
      label: "Sustainability",
      desc: "Partners who share our values."
    }
  ];


  contact = [
    {
      icon: "✉",
      text: "hello@abfashion.com"
    },
    {
      icon: "☎",
      text: "+1 (555) 234-5678"
    },
    {
      icon: "📍",
      text: "123 Fashion Ave, New York, NY 10001"
    },
    {
      icon: "🕒",
      text: "Mon-Fri, 9am-6pm EST"
    }
  ];


  sendMessage(event: Event){
    event.preventDefault();

    console.log("Message sent");
  }

}