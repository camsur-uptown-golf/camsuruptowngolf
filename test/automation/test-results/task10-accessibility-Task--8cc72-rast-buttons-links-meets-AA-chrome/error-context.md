# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task10-accessibility.spec.ts >> Task 10 · Accessibility & Keyboard >> 09 — Colour contrast (buttons/links) meets AA
- Location: tests\task10-accessibility.spec.ts:80:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 653

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f7f5ee",
+               "contrastRatio": 3.28,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7f8a82",
+               "fontSize": "9.8pt (13px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.28 (foreground color: #7f8a82, background color: #f7f5ee, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"bg-[#f7f5ee]\">",
+                 "target": Array [
+                   ".bg-\\[\\#f7f5ee\\]:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.28 (foreground color: #7f8a82, background color: #f7f5ee, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<a class=\"underline-offset-4 transition-colors hover:text-[#2f644b] hover:underline\" href=\"/\">Home</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".hover\\:underline",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"border border-[#173b2a]/12 bg-white p-6\">",
+                 "target": Array [
+                   ".border-\\[\\#173b2a\\]\\/12.p-6.bg-white:nth-child(1)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mt-4 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]\">By phone</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".border-\\[\\#173b2a\\]\\/12.p-6.bg-white:nth-child(1) > .tracking-\\[0\\.16em\\].mt-4.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"border border-[#173b2a]/12 bg-white p-6\">",
+                 "target": Array [
+                   ".border-\\[\\#173b2a\\]\\/12.p-6.bg-white:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mt-4 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]\">By email</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".border-\\[\\#173b2a\\]\\/12.p-6.bg-white:nth-child(2) > .tracking-\\[0\\.16em\\].mt-4.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"border border-[#173b2a]/12 bg-white p-6\">",
+                 "target": Array [
+                   ".border-\\[\\#173b2a\\]\\/12.p-6.bg-white:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mt-4 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]\">Where we are</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".border-\\[\\#173b2a\\]\\/12.p-6.bg-white:nth-child(3) > .tracking-\\[0\\.16em\\].mt-4.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-first\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-last\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-email\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-interest\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-guests\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.16,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a938c",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.16 (foreground color: #8a938c, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.16 (foreground color: #8a938c, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mt-2 text-xs leading-5 text-[#8a938c]\">Please enter a number from 1 to 100.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div:nth-child(6) > .text-\\[\\#8a938c\\].leading-5.text-xs",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-timeframe\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "legend > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.16,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a938c",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.16 (foreground color: #8a938c, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.16 (foreground color: #8a938c, background color: #ffffff, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mt-2 text-xs leading-5 text-[#8a938c]\">Philippine time (PHT).</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "fieldset > .text-\\[\\#8a938c\\].leading-5.text-xs",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 4.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#98782f",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"message\" class=\"scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16\">",
+                 "target": Array [
+                   "#message",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.14 (foreground color: #98782f, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]\">(required)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"rc-mobile\"] > .ml-1\\.5.font-normal.normal-case",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 3.49,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7b8d85",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.49 (foreground color: #7b8d85, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.49 (foreground color: #7b8d85, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span>I agree to receive news and offers from CamSur Uptown, and I have read the<!-- --> <span class=\"text-white/80\">Privacy Policy</span>.</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".max-w-md > span",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 2.9,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b8076",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>© 2026 CamSur Uptown Golf Club. All rights reserved.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".gap-x-4 > p",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 4.32,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8e9d96",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.32 (foreground color: #8e9d96, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.32 (foreground color: #8e9d96, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<a class=\"font-medium text-white/50 transition-colors hover:text-[#f0dca0]\" href=\"/terms-of-use\">Terms of Use</a>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-white\\/50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#1c3b2d",
+               "contrastRatio": 2.9,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b8076",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<footer id=\"contact\" class=\"relative overflow-hidden bg-[#1c3b2d] text-white\">",
+                 "target": Array [
+                   "#contact",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.9 (foreground color: #6b8076, background color: #1c3b2d, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Championship golf in the heart of Camarines Sur.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".mt-14 > p",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic:
      - link "Camsur Uptown Golf Club — home" [ref=e3] [cursor=pointer]:
        - /url: /
        - img "Camsur Uptown Golf Club" [ref=e5]
      - generic:
        - generic [ref=e6]:
          - link "Plan your visit" [ref=e7] [cursor=pointer]:
            - /url: /plan-your-visit
          - link "09163007914" [ref=e12] [cursor=pointer]:
            - /url: tel:+639163007914
        - navigation "Primary navigation" [ref=e15]:
          - button "GOLF" [ref=e16] [cursor=pointer]
          - button "CLUBHOUSE" [ref=e17] [cursor=pointer]
          - button "PACKAGES" [ref=e18] [cursor=pointer]
          - button "ACCOMMODATIONS" [ref=e19] [cursor=pointer]
          - button "EXPERIENCES" [ref=e20] [cursor=pointer]
          - button "EVENTS" [ref=e21] [cursor=pointer]
      - link "Contact Us" [ref=e22] [cursor=pointer]:
        - /url: /contact
  - main [ref=e23]:
    - generic [ref=e25]:
      - paragraph [ref=e26]: Contact us
      - heading "We are glad to hear from you." [level=1] [ref=e27]
      - paragraph [ref=e28]: Call the club, send an email, or leave a message below. Someone from the team comes back to every enquiry within 48 hours.
    - navigation "Breadcrumb" [ref=e30]:
      - list [ref=e31]:
        - listitem [ref=e32]:
          - link "Home" [ref=e33] [cursor=pointer]:
            - /url: /
        - listitem [ref=e34]:
          - generic [aria-hidden] [ref=e35]: /
          - generic [ref=e36]: Contact
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - paragraph [ref=e44]: By phone
          - generic [ref=e45]:
            - link "09163007914" [ref=e46] [cursor=pointer]:
              - /url: tel:+639163007914
            - paragraph [ref=e47]: Mondays to Sundays
        - generic [ref=e48]:
          - paragraph [ref=e53]: By email
          - generic [ref=e54]:
            - link "inquiries@camsuruptown.com" [ref=e55] [cursor=pointer]:
              - /url: mailto:inquiries@camsuruptown.com
            - paragraph [ref=e56]: Replies within 48 hours
        - generic [ref=e57]:
          - paragraph [ref=e62]: Where we are
          - generic [ref=e63]:
            - paragraph [ref=e64]: CamSur Uptown Golf Club
            - paragraph [ref=e65]: Camarines Sur, Philippines
      - paragraph [ref=e66]:
        - text: Planning a round, a stay, or an event?
        - link "Plan your visit" [ref=e67] [cursor=pointer]:
          - /url: /plan-your-visit
        - text: has everything the club needs to prepare for you.
    - generic [ref=e69]:
      - generic [ref=e70]:
        - paragraph [ref=e71]: Send a message
        - heading "Tell us what you need." [level=2] [ref=e72]
        - paragraph [ref=e73]: Leave your question and how best to reach you. There is a free-text box at the end for anything that does not fit the fields above it.
      - generic [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - generic [ref=e78]: First name(required)
            - textbox "First name(required)" [ref=e79]
          - generic [ref=e80]:
            - generic [ref=e81]: Last name(required)
            - textbox "Last name(required)" [ref=e82]
          - generic [ref=e83]:
            - generic [ref=e84]: Email(required)
            - textbox "Email(required)" [ref=e85]
          - generic [ref=e86]:
            - generic [ref=e87]: Postal code
            - textbox "Postal code" [ref=e88]
          - generic [ref=e89]:
            - generic [ref=e90]: I am interested in(required)
            - combobox "I am interested in(required)" [ref=e91]:
              - option "Golf trip" [selected]
              - option "Stay and play package"
              - option "Corporate or group event"
              - option "Wedding or celebration"
              - option "Membership"
              - option "Something else"
          - generic [ref=e92]:
            - generic [ref=e93]: How many guests?(required)
            - spinbutton "How many guests?(required)" [ref=e94]
            - paragraph [ref=e95]: Please enter a number from 1 to 100.
          - generic [ref=e96]:
            - generic [ref=e97]: My specific question is…
            - textbox "My specific question is…" [ref=e98]
          - generic [ref=e99]:
            - generic [ref=e100]: When would you like to visit?(required)
            - combobox "When would you like to visit?(required)" [ref=e101]:
              - option "Select a timeframe" [disabled] [selected]
              - option "Within the next month"
              - option "In one to three months"
              - option "In three to six months"
              - option "More than six months from now"
              - option "Not sure yet"
          - group "The best time to call me back is(required)" [ref=e102]:
            - generic [ref=e104]:
              - generic [ref=e105] [cursor=pointer]:
                - checkbox "9:00 AM – 12:00 PM" [ref=e106]
                - text: 9:00 AM – 12:00 PM
              - generic [ref=e107] [cursor=pointer]:
                - checkbox "12:00 – 2:00 PM" [ref=e108]
                - text: 12:00 – 2:00 PM
              - generic [ref=e109] [cursor=pointer]:
                - checkbox "2:00 – 4:00 PM" [ref=e110]
                - text: 2:00 – 4:00 PM
              - generic [ref=e111] [cursor=pointer]:
                - checkbox "4:00 – 6:00 PM" [ref=e112]
                - text: 4:00 – 6:00 PM
            - paragraph [ref=e113]: Philippine time (PHT).
          - generic [ref=e114]:
            - generic [ref=e115]: Mobile number(required)
            - textbox "Mobile number(required)" [ref=e116]:
              - /placeholder: Ex. +63 917 123 4567
        - button "Submit" [ref=e118]
  - contentinfo [ref=e119]:
    - generic [ref=e121]:
      - generic [ref=e122]:
        - generic [ref=e124]:
          - img "Camsur Uptown Golf Club" [ref=e125]
          - generic [ref=e126]:
            - paragraph [ref=e127]: CamSur Uptown Golf Club
            - paragraph [ref=e128]: Camarines Sur, Philippines
            - paragraph [ref=e129]:
              - link "09163007914" [ref=e130] [cursor=pointer]:
                - /url: tel:+639163007914
        - navigation "Footer navigation" [ref=e131]:
          - generic [ref=e132]:
            - paragraph [ref=e133]: Play
            - list [ref=e134]:
              - listitem [ref=e135]:
                - link "The Course" [ref=e136] [cursor=pointer]:
                  - /url: /golf
              - listitem [ref=e137]:
                - link "Packages" [ref=e138] [cursor=pointer]:
                  - /url: /packages
          - generic [ref=e139]:
            - paragraph [ref=e140]: Stay & Play
            - list [ref=e141]:
              - listitem [ref=e142]:
                - link "Accommodations" [ref=e143] [cursor=pointer]:
                  - /url: /accommodations
              - listitem [ref=e144]:
                - link "Dining" [ref=e145] [cursor=pointer]:
                  - /url: /dining
          - generic [ref=e146]:
            - paragraph [ref=e147]: The Club
            - list [ref=e148]:
              - listitem [ref=e149]:
                - link "Experiences" [ref=e150] [cursor=pointer]:
                  - /url: /experiences
              - listitem [ref=e151]:
                - link "Events" [ref=e152] [cursor=pointer]:
                  - /url: /events
              - listitem [ref=e153]:
                - link "Contact Us" [ref=e154] [cursor=pointer]:
                  - /url: /contact
        - generic [ref=e155]:
          - paragraph [ref=e156]: News & offers
          - heading "Stay connected to the club." [level=2] [ref=e157]
          - paragraph [ref=e158]: Course updates, event announcements, and occasional offers from CamSur Uptown, sent straight to your inbox.
          - generic [ref=e159]:
            - generic [ref=e160]:
              - textbox "Email address" [ref=e161]
              - button "Subscribe" [ref=e162]
            - generic [ref=e163]:
              - checkbox "I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy." [ref=e164]
              - generic [ref=e165]: I agree to receive news and offers from CamSur Uptown, and I have read the Privacy Policy.
      - generic [ref=e166]:
        - generic [ref=e167]:
          - paragraph [ref=e168]: © 2026 CamSur Uptown Golf Club. All rights reserved.
          - link "Terms of Use" [ref=e169] [cursor=pointer]:
            - /url: /terms-of-use
        - paragraph [ref=e170]: Championship golf in the heart of Camarines Sur.
  - button "Open Next.js Dev Tools" [ref=e176] [cursor=pointer]
  - alert [ref=e180]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | import { findImagesMissingAlt } from '../utils/helpers';
  4   | 
  5   | /**
  6   |  * QA Task 10 — Accessibility & Keyboard Navigation (TC-279 … TC-296) = 18 cases.
  7   |  * axe-core WCAG 2.1 AA where it maps + keyboard-operability DOM checks.
  8   |  * A manual NVDA/VoiceOver pass is still required for full screen-reader coverage.
  9   |  */
  10  | async function axeViolations(page: import('@playwright/test').Page, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) {
  11  |   const r = await new AxeBuilder({ page }).withTags(tags).analyze();
  12  |   return r.violations;
  13  | }
  14  | 
  15  | test.describe('Task 10 · Accessibility & Keyboard', () => {
  16  |   test('01 — Keyboard-only navigation reaches interactive elements', async ({ page }) => {
  17  |     await page.goto('/');
  18  |     for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
  19  |     const tag = await page.evaluate(() => document.activeElement?.tagName ?? '');
  20  |     expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(tag);
  21  |   });
  22  | 
  23  |   test('02 — Visible focus indicator on interactive elements', async ({ page }) => {
  24  |     await page.goto('/');
  25  |     await page.keyboard.press('Tab');
  26  |     const outline = await page.evaluate(() => {
  27  |       const el = document.activeElement as HTMLElement | null;
  28  |       if (!el) return 'none|0px|none';
  29  |       const s = getComputedStyle(el);
  30  |       return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
  31  |     });
  32  |     expect(outline).not.toBe('none|0px|none');
  33  |   });
  34  | 
  35  |   test('03 — Skip-to-content link appears on first Tab', async ({ page }) => {
  36  |     await page.goto('/');
  37  |     await page.keyboard.press('Tab');
  38  |     const skip = page.getByRole('link', { name: /skip/i });
  39  |     if ((await skip.count()) === 0) test.skip(true, 'No skip link — recommend adding one.');
  40  |     await expect(skip.first()).toBeFocused();
  41  |   });
  42  | 
  43  |   test('04 — Mega-menu is keyboard operable', async ({ page }) => {
  44  |     await page.goto('/');
  45  |     await page.getByRole('button', { name: /^GOLF$/i }).focus();
  46  |     await page.keyboard.press('Enter');
  47  |     await expect(page.getByRole('link', { name: 'Hole No. 1' })).toBeVisible();
  48  |   });
  49  | 
  50  |   test('05 — Mobile drawer manages focus', async ({ browser }) => {
  51  |     const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  52  |     const page = await ctx.newPage();
  53  |     await page.goto('/');
  54  |     const burger = page.getByRole('button', { name: /menu|navigation/i }).or(page.locator('button[aria-label*="menu" i]')).first();
  55  |     if ((await burger.count()) === 0) { await ctx.close(); test.skip(true, 'No hamburger — confirm selector.'); }
  56  |     await burger.click();
  57  |     await expect(page.locator('nav, [role="dialog"]').first()).toBeVisible();
  58  |     await ctx.close();
  59  |   });
  60  | 
  61  |   test('06 — Form fields have associated labels', async ({ page }) => {
  62  |     await page.goto('/contact');
  63  |     const violations = (await axeViolations(page)).filter((v) => v.id === 'label');
  64  |     expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  65  |   });
  66  | 
  67  |   test('07 — Form errors are announced (aria)', async ({ page }) => {
  68  |     await page.goto('/contact');
  69  |     const live = page.locator('[aria-live], [role="alert"], [aria-describedby]');
  70  |     // presence of an announce mechanism anywhere on the form page
  71  |     expect(await live.count()).toBeGreaterThanOrEqual(0);
  72  |   });
  73  | 
  74  |   test('08 — Colour contrast (text) meets AA', async ({ page }) => {
  75  |     await page.goto('/');
  76  |     const violations = (await axeViolations(page, ['wcag2aa'])).filter((v) => v.id === 'color-contrast');
  77  |     expect(violations, JSON.stringify(violations.map((v) => v.nodes.length), null, 2)).toEqual([]);
  78  |   });
  79  | 
  80  |   test('09 — Colour contrast (buttons/links) meets AA', async ({ page }) => {
  81  |     await page.goto('/contact');
  82  |     const violations = (await axeViolations(page, ['wcag2aa'])).filter((v) => v.id === 'color-contrast');
> 83  |     expect(violations).toEqual([]);
      |                        ^ Error: expect(received).toEqual(expected) // deep equality
  84  |   });
  85  | 
  86  |   test('10 — Heading hierarchy: single H1 per page', async ({ page }) => {
  87  |     for (const path of ['/', '/golf', '/contact']) {
  88  |       await page.goto(path);
  89  |       expect(await page.locator('h1').count(), `H1 on ${path}`).toBe(1);
  90  |     }
  91  |   });
  92  | 
  93  |   test('11 — Meaningful images have alt text', async ({ page }) => {
  94  |     await page.goto('/');
  95  |     expect(await findImagesMissingAlt(page)).toEqual([]);
  96  |   });
  97  | 
  98  |   test('12 — Landmarks / ARIA roles present', async ({ page }) => {
  99  |     await page.goto('/');
  100 |     const violations = (await axeViolations(page)).filter((v) => v.id.includes('landmark') || v.id.includes('region'));
  101 |     expect(violations).toEqual([]);
  102 |   });
  103 | 
  104 |   test('13 — Lightbox / dialog traps focus and closes', async ({ page }) => {
  105 |     await page.goto('/golf/courses/hole-no.1', { waitUntil: 'networkidle' });
  106 |     const dialog = page.locator('[role="dialog"]');
  107 |     if ((await dialog.count()) === 0) test.skip(true, 'No dialog/lightbox found on this page.');
  108 |     await page.keyboard.press('Escape');
  109 |     await expect(page.locator('header')).toBeVisible();
  110 |   });
  111 | 
  112 |   test('14 — No keyboard trap (can Tab through and back)', async ({ page }) => {
  113 |     await page.goto('/');
  114 |     for (let i = 0; i < 15; i++) await page.keyboard.press('Tab');
  115 |     for (let i = 0; i < 15; i++) await page.keyboard.press('Shift+Tab');
  116 |     await expect(page.locator('body')).toBeVisible();
  117 |   });
  118 | 
  119 |   test('15 — Reduced-motion preference respected', async ({ browser }) => {
  120 |     const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  121 |     const page = await ctx.newPage();
  122 |     await page.goto('/');
  123 |     await expect(page.locator('header')).toBeVisible();
  124 |     await ctx.close();
  125 |   });
  126 | 
  127 |   test('16 — Content reflows at 200% zoom', async ({ page }) => {
  128 |     await page.goto('/');
  129 |     await page.evaluate(() => ((document.body.style as any).zoom = '2'));
  130 |     const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  131 |     expect(overflow).toBeLessThanOrEqual(4);
  132 |   });
  133 | 
  134 |   test('17 — Link purpose is clear (no bare "click here")', async ({ page }) => {
  135 |     await page.goto('/');
  136 |     const bad = await page.$$eval('a', (as) => as.filter((a) => /^(click here|here|read more)$/i.test((a.textContent || '').trim())).length);
  137 |     expect(bad, 'ambiguous link texts').toBe(0);
  138 |   });
  139 | 
  140 |   test('18 — Touch targets are at least ~44px (mobile)', async ({ browser }) => {
  141 |     const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  142 |     const page = await ctx.newPage();
  143 |     await page.goto('/');
  144 |     const small = await page.$$eval('header a, header button', (els) =>
  145 |       els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40); }).length,
  146 |     );
  147 |     await ctx.close();
  148 |     expect(small, 'interactive targets smaller than ~44px').toBeLessThanOrEqual(2);
  149 |   });
  150 | });
  151 | 
```