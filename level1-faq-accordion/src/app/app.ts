import {Component} from '@angular/core';

type FAQ = {
  id: number;
  title: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  faqs: FAQ[] = [
    {
      id: 1,
      title: `What is Frontend Mentor, and how will it help me?`,
      answer: `Frontend Mentor offers realistic coding challenges to help developers improve their
        frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for
        all levels and ideal for portfolio building.`,
      isOpen: false
    },
    {
      id: 2,
      title: `Is Frontend Mentor free?`,
      answer: `Yes, Frontend Mentor offers both free and premium coding challenges, with the free
        option providing access to a range of projects suitable for all skill levels.`,
      isOpen: false
    },
    {
      id: 3,
      title: `Can I use Frontend Mentor projects in my portfolio?`,
      answer: `Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent
        way to showcase your skills to potential employers!`,
      isOpen: false
    },
    {
      id: 4,
      title: `How can I get help if I'm stuck on a Frontend Mentor challenge?`,
      answer: `The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.`,
      isOpen: false
    },
  ]

  onFaqClick(faq: FAQ) {
    faq.isOpen = !faq.isOpen;
  }

  faqIcon(isOpen: boolean): string {
    return isOpen ? 'icon-minus.svg' : 'icon-plus.svg';
  }
}
