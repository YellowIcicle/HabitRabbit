/*
 * faq.component.ts Copyright (c) 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 */

import {Component, OnInit} from '@angular/core';
import {FAQService} from '../service/faq.service';
import {FaqItem} from '@angular-material-extensions/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  list: FaqItem[] = [];

  constructor(private faqService: FAQService) {
  }

  onNewFaqItem(faqItem: FaqItem) {
    this.faqService.saveFAQ(faqItem).subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.list = [];
    this.faqService.getFAQs().subscribe((res: FaqItem[]) => {
      res.forEach((i) => {
        this.list.push({id: i.id, question: i.question, answer: i.answer});
      });
    });
  }

}
